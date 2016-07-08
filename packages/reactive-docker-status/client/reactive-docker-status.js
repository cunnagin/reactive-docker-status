// package: npm
// end: client
// name: reactive-docker-status
// author: stephen cunnagin
// info: provides a reactive status for docker to a meteor application

import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { dockerStatus } from '../imports/collections.js'

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

export function dockerStatusCreate(argHostName, argPort, argName){
	Meteor.call('dockerStatusCreate', argHostName, argPort, argName, function(){
		console.log('Created New Docker Status Object on Server')
	})
}

dockerStatusCreate('http://meteor-vm.ldd.rds.lexmark.com')