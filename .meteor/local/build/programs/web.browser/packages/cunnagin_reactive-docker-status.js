//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Mongo = Package.mongo.Mongo;
var Template = Package.templating.Template;
var WebApp = Package.webapp.WebApp;
var _ = Package.underscore._;
var DDP = Package['ddp-client'].DDP;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Autoupdate = Package.autoupdate.Autoupdate;
var Reload = Package.reload.Reload;
var HTML = Package.htmljs.HTML;

var require = meteorInstall({"node_modules":{"meteor":{"cunnagin:reactive-docker-status":{"client":{"reactive-docker-status.js":["meteor/meteor","meteor/templating","../imports/collections.js",function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/cunnagin_reactive-docker-status/client/reactive-docker-status.js            //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
exports.__esModule = true;                                                              //
exports.dockerStatusCreate = dockerStatusCreate;                                        //
                                                                                        //
var _meteor = require('meteor/meteor');                                                 // 7
                                                                                        //
var _templating = require('meteor/templating');                                         // 8
                                                                                        //
var _collections = require('../imports/collections.js');                                // 9
                                                                                        //
_templating.Template.body.onCreated(function () {                                       // 11
	_meteor.Meteor.subscribe('dockerStatus');                                              // 12
}); // package: npm                                                                     // 13
// end: client                                                                          //
// name: reactive-docker-status                                                         //
// author: stephen cunnagin                                                             //
// info: provides a reactive status for docker to a meteor application                  //
                                                                                        //
_templating.Template.registerHelper('dockerContainers', function () {                   // 15
	var result = _collections.dockerStatus.findOne({ name: '_dockerList' });               // 16
	result = result === undefined ? null : result.data;                                    // 17
	return result;                                                                         // 18
});                                                                                     // 19
                                                                                        //
_templating.Template.registerHelper('dockerPrint', function (container) {               // 21
	return JSON.stringify(container);                                                      // 22
});                                                                                     // 23
                                                                                        //
function dockerStatusCreate(argHostName, argPort, argName) {                            // 25
	_meteor.Meteor.call('dockerStatusCreate', argHostName, argPort, argName, function () {
		console.log('Created New Docker Status Object on Server');                            // 27
	});                                                                                    // 28
}                                                                                       // 29
                                                                                        //
dockerStatusCreate('http://meteor-vm.ldd.rds.lexmark.com');                             // 31
//////////////////////////////////////////////////////////////////////////////////////////

}]},"imports":{"collections.js":["meteor/mongo",function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/cunnagin_reactive-docker-status/imports/collections.js                      //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
exports.__esModule = true;                                                              //
exports.dockerStatus = undefined;                                                       //
                                                                                        //
var _mongo = require('meteor/mongo');                                                   // 1
                                                                                        //
// For Docker report data storage in mongodDB                                           //
var dockerStatus = exports.dockerStatus = new _mongo.Mongo.Collection('dockerStatus');  // 4
//////////////////////////////////////////////////////////////////////////////////////////

}]}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/cunnagin:reactive-docker-status/client/reactive-docker-status.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cunnagin:reactive-docker-status'] = {};

})();
