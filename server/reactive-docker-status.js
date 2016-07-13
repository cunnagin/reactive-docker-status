// my 'dockerStatus' mongodb collection
import { dockerStatus } from '../imports/collections.js'

// the 2 heavy-lifter libraries
import Docker from 'dockerode'				// Docker API
import DockerEvents from 'docker-events' 	// Docker event stream

console.log('*** Server code up and running ***')

// core server code to run on startup
Meteor.startup(() => {

	// publish the 'dockerStatus' collection
	Meteor.publish('dockerStatus', function(){
		console.log('*** Publishing the dockerStatus collection ***')
		return dockerStatus.find()
	})

	// this class object is used for each docker instance to monitor updates
	// highly leveraging the great npm packages 'dockerode' & 'docker-events'
	class reactiveDockerStatus {

		constructor(argHostname, argPort, argName){

			// if this is the 1st instantiation, better initialize the mongo collection
			if (Object.keys(reactiveDockerStatus.prototype.emitterList).length==0) {
				dockerStatus.remove({}, function(){
						self.docker.listContainers(Meteor.bindEnvironment(function(err,result){
						let rec = { name: argName, data: result }
						dockerStatus.upsert({ name: argName}, rec)
					}))
				})
			}

			if (argPort==undefined) {
				argPort='2375'
			}

			if (argName==undefined) {
				argName='_dockerList'
			}			

			// forgive me... our object root scope
			self = this
			
			// check if there is already a reactive collection for this hostname
			this.docker = new Docker({host: argHostname, port: argPort })
			this.emitter = new DockerEvents({docker: this.docker})

			// define emitter events
			this.emitter.start()

			this.emitter.on('connect', Meteor.bindEnvironment(function(){
				console.log('*** Docker API Connected ***')
			}))

			this.emitter.on('_message', Meteor.bindEnvironment(function(message){
				console.log(`...from docker: ${JSON.stringify(message)}`)
				if ((message.status=='start')||(message.status=='destroy')){
					self.docker.listContainers(Meteor.bindEnvironment(function(err,result){
						let rec = { name: argName, data: result }
						dockerStatus.upsert({ name: argName}, rec)
					}))
				}
			}))

			// add this object to the shared-state class-proto object for tracking
			reactiveDockerStatus.prototype.emitterList[argName] = { name: argName, rdsObject: self }

			return
		}
	}

	// shared data amongst the 'reactiveDockerStatus' objects
	reactiveDockerStatus.prototype.emitterList = {}

	Meteor.methods({
		'dockerStatusCreate': function(argHostname, argPort, argName){
			console.log('*** Creating new docker-status object ***')
			try {
				new reactiveDockerStatus(argHostname, argPort, argName)
			} catch(err) {
				console.log('!!! Whoops... could not make docker-status object !!!',err)
			}
		}
	})
	
})