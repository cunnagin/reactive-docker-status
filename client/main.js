// package: npm
// end: client
// name: reactive-docker-status
// author: stephen cunnagin
// info: provides a reactive status for docker to a meteor application

import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { dockerStatus } from '../imports/collections.js'
import './main.html'

Template.status.helpers({

  dockerList(){
  	var result = dockerStatus.findOne({name: 'dockerList'})
 		return result.data
  },

  print(container){
  	return JSON.stringify(container)
  }

});
