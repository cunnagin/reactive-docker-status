// package: npm
// end: server
// name: reactive-docker-status
// author: stephen cunnagin
// info: provides a reactive status for docker to a meteor application

import { Meteor } from 'meteor/meteor'

// my 'dockerStatus' mongodb collection
import '../imports/collections.js'

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

		constructor(argDS){

			try {
				// Check for minimal argument passed ... the hostname
				if (argDS.host==undefined) {
					throw 'InvalidHostname'
				}

				// See if additional arguments were passed and construct defaults if needed
				if (argDS.port==undefined) {
					argDS.port='2375'
				}

				if (argDS.name==undefined) {
					argDS.name='_dockerList'
				}

				// Forgive me... reference our object root scope
				self = this

				// Create a new dockerode object
				this.docker = new Docker(argDS)
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
							let rec = { name: argDS.name, data: result }
							dockerStatus.upsert({ name: argDS.name}, rec)
						}))
					}
				}))

				// Check the class object tracking running instances of Dockerode/Docker-events objects.
				// If this is the 1st instantiation, then clear out the mongo collection
				if (Object.keys(reactiveDockerStatus.prototype.emitterList).length==0) {
					dockerStatus.remove({}, function(){
							self.docker.listContainers(Meteor.bindEnvironment(function(err,result){
							let rec = { name: argDS.name, data: result }
							dockerStatus.upsert({ name: argDS.name}, rec)
						}))
					})
				}

				// Shared-state dockerStatus object for tracking server instances
				reactiveDockerStatus.prototype.emitterList[argDS.name] = { name: argDS.name, rdsObject: self }
			}
			catch(err) {
				console.log(err)
			}
		}
	}

	// shared data amongst the 'reactiveDockerStatus' objects
	reactiveDockerStatus.prototype.emitterList = {}

	Meteor.methods({
		'dockerStatusCreate': function(argDS){
			console.log('*** Creating new docker-status object ***')
			try {
				new reactiveDockerStatus(argDS)
			} catch(err) {
				console.log('!!! Failed to make reactiveDockerStatus object !!!',err)
			}
		}
	})


})
