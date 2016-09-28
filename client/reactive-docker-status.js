// package: npm
// end: client
// name: reactive-docker-status
// author: stephen cunnagin
// info: provides a reactive status for docker to a meteor application

import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import '../imports/collections.js'

Template.body.onCreated(function(){
    Meteor.subscribe('dockerStatus')
})

Template.registerHelper('dockerContainers', ()=> {
	var result = dockerStatus.findOne({name: '_dockerList'})
    result = ((result===undefined)?null:result.data)
    return result
})

Template.registerHelper('dockerPrint', (container)=> {
	return JSON.stringify(container)
})

dockerStatusCreate = function(_argDS){
	// At minimum need to have the Docker server hostname in here... other params are:
	//      port: '2375' is default [Dockerode]
	//		ca: local filename for Certificate Authorization file 'ca.pem' [Dockerode]
	//      cert: local filename for Certificat file 'cert.pem' [Dockerode]
	//      key: local filename for Public Key 'key.pem' [Dockerode]
	//      name: short name [custom]
	if ('host' in _argDS) {
		Meteor.call('dockerStatusCreate', _argDS, function(){
			console.log('Created New Docker Status Object on Server')
		})
	} else {
		throw 'Improper Host Argument (_argDS) on Client'
	}
}

//export { dockerStatusCreate, dockerStatus }