## reactive-docker-status ##

This is a Meteor (1.3+) package that provides a reactive wrapper around the npm packages - 'dockerode' (exposes Docker's API) and 'docker-events' (creates event emitter's on top of the API).

```meteor add cunnagin:reactive-docker-status```

## How it works ##

Internally, a mongo collection called *_dockerStatus* is created and stores objects representing the status for each docker service being monitored. All monitoring occurs from the Meteor server.

In order to create a docker service object, simply make a call from your client (this actually calls a method stub on the server) as such:

```js
dockerStatusCreate({host: argHostname, port: argPort, ca: argCa, cert: argCert, key: argKey, name: argName,})
```

Where:

```
argHostName => (string, required) ...the desired docker hostname to monitor, e.g. 'http://my.dockerserver'
argPort => (string, optional) ...the port for the docker API, e.g. default is '2375'
argCa => fs pointer to a 'ca.pem' file [for SSL]
argCert => fs pointer to a 'cert.pem' file [for SSL]
argKey => fs pointer to a 'key.pem' file [for SSL]
argName => (string, optional) ...a simple name for this docker service object, e.g. default is '_dockerList'
```

The first 5 parameters are the same as for the 'dockerode' instantiation object (see their help files).

A few global Template helpers are available to help see the results:

```js
dockerContainers() 
dockerPrint(containerRecord)
```

Here is an example JS and HTML file for the client to show how to use these:

```js

Template.status.helpers({
  dockerStatusCreate({host: 'http:///your.docker.hostname'})
})

```

```html
<!--	package: npm
 		end: client
		name: reactive-docker-status
		author: stephen cunnagin
		info: provides a reactive status for docker to a meteor application
-->

<head>
  <title>docker-api</title>
</head>

<body>
  <h1>Reactive Docker Status for Meteor</h1>
  {{> status}}
</body>

<template name='status'>
  <h2>Docker Containers</h2>
  {{#each container in dockerContainers}}
    <h3>Container #{{@index}}</h3>
    <h4>{{dockerPrint container}}</h4>
  {{/each}}
</template>
```

stephen
