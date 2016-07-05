// package: npm
// end: server
// name: reactive-docker-status
// author: stephen cunnagin
// info: provides a reactive status for docker to a meteor application

import { Meteor } from 'meteor/meteor'

// my 'dockerstatus' mongodb collection
import { dockerStatus } from '../imports/collections.js'

// the 2 heavy-lifter libraries
import Docker from 'dockerode'				// Docker API
import DockerEvents from 'docker-events' 	// Docker event stream

// core server code to run on startup
Meteor.startup(() => {

	// this class object is used for each docker instance to monitor updates
	// highly leveraging the great npm packages 'dockerode' & 'docker-events'
	class reactiveDockerStatus {

		constructor(argName, argHostname, argPort){

			// if this is the 1st instantiation, better initialize the mongo collection
			if (Object.keys(reactiveDockerStatus.prototype.emitterList).length==0) {
				dockerStatus.remove({}, function(){
						self.docker.listContainers(Meteor.bindEnvironment(function(err,result){
						let rec = { name: argName, data: result }
						dockerStatus.upsert({ name: argName}, rec)
					}))
				})
			}

			// use this shared-state object to track new Docker emitter streams
			reactiveDockerStatus.prototype.emitterList[argName] = { hostname: argHostname, port: argPort }
			console.log(JSON.stringify(reactiveDockerStatus.prototype.emitterList))

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

			return self
		}
	}

	// shared data amongst the 'reactiveDockerStatus' objects
	reactiveDockerStatus.prototype.emitterList = {}

	// create a couple of reactive-docker-status object instance
	var rds = new reactiveDockerStatus('dockerList', 'http://meteor-vm.ldd.rds.lexmark.com', '2375', 'dockerStatus')
	var rds2 = new reactiveDockerStatus('dockerPoop', 'http://meteor-vm.ldd.rds.lexmark.com', '2375', 'dockerStatus')

})

