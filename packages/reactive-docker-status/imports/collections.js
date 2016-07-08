import { Mongo } from 'meteor/mongo'

// For Docker report data storage in mongodDB
export const dockerStatus = new Mongo.Collection('dockerStatus')