import { Mongo } from 'meteor/mongo'

// For Docker report data storage in mongodDB
dockerStatus = new Mongo.Collection('dockerStatus')