var require = meteorInstall({"client":{"template.reactive-docker-status.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// client/template.reactive-docker-status.js                                           //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
                                                                                       // 1
Template.body.addContent((function() {                                                 // 2
  var view = this;                                                                     // 3
  return [ HTML.Raw("<h1>Reactive Docker Status for Meteor</h1>\n  "), Spacebars.include(view.lookupTemplate("status")) ];
}));                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                        // 6
                                                                                       // 7
Template.__checkName("status");                                                        // 8
Template["status"] = new Template("Template.status", (function() {                     // 9
  var view = this;                                                                     // 10
  return [ HTML.Raw("<h2>Docker Containers</h2>\n  "), Blaze.Each(function() {         // 11
    return {                                                                           // 12
      _sequence: Spacebars.call(view.lookup("dockerContainers")),                      // 13
      _variable: "container"                                                           // 14
    };                                                                                 // 15
  }, function() {                                                                      // 16
    return [ "\n    ", HTML.H3("Container #", Blaze.View("lookup:@index", function() {
      return Spacebars.mustache(view.lookup("@index"));                                // 18
    })), "\n    ", HTML.H4(Blaze.View("lookup:dockerPrint", function() {               // 19
      return Spacebars.mustache(view.lookup("dockerPrint"), view.lookup("container"));
    })), "\n  " ];                                                                     // 21
  }) ];                                                                                // 22
}));                                                                                   // 23
                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/template.reactive-docker-status.js");