// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by reactive-docker-status.js.
import { name as packageName } from "meteor/cunnagin:reactive-docker-status";

// Write your tests here!
// Here is an example.
Tinytest.add('reactive-docker-status - example', function (test) {
  test.equal(packageName, "reactive-docker-status");
});
