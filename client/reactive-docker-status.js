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
	var result = dockerStatus.findOne({name: 'dockerList'})
    result = ((result===undefined)?null:result.data)
    return result
})

Template.registerHelper('dockerPrint', (container)=> {
	return JSON.stringify(container)
})