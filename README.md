# reactive-docker-status
Reactive support for monitoring a Docker server within a Meteor (1.3+) application (uses mongoDB)

If you have a Docker service running on a machine and want to monitor it's status (i.e. running containers at any given time) this will provide a reactively updated status to your Meteor application.

Two npm packages - dockerode (exposes the Docker API) and docker-events (creates an event stream) - are used to update a Meteor mongodb collection. All subscribers to that collection can then get reactive updates to the current docker status objects.




