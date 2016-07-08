// packages/cunnagin:reactive-docker-status/package.js

Package.describe({
  summary: 'Provides a reactive collection update for monitoring a docker server status',

  // Version number major-version:minor-version:patch-version
  version: "0.1.0",

  // Optional.  Default is package directory name.
  name: "cunnagin:reactive-docker-status",

  // Optional github URL to your source repository.
  git: "https://github.com/cunnagin/reactive-docker-status.git",
})

Npm.depends({
	'dockerode': '2.2.10',
  'docker-events': '0.0.2'
})

Package.on_use(function(api){
  api.versionsFrom('METEOR@1.3')
  api.use('meteor-base',['client','server'])
  api.use('mongo',['client','server'])
  api.use('ecmascript',['client','server'])
  api.use('es5-shim',['client','server'])
	api.use('templating','client')
	api.add_files('client/reactive-docker-status.js','client')
  api.add_files('server/reactive-docker-status.js','server')
	api.add_files('imports/collections.js',['client','server'])
})
