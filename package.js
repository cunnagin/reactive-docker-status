// packages/cunnagin:reactive-docker-status/package.js

Package.describe({
  summary: 'Provides a reactive collection update for monitoring a docker server status',
  version: "1.0.3",
  name: "cunnagin:reactive-docker-status",
  git: "https://github.com/cunnagin/reactive-docker-status.git",
  describe: "README.md"
})

Npm.depends({
  'dockerode': '2.2.10',
  'docker-events': '0.0.2'
})

Package.onUse(function(api){
  api.versionsFrom('METEOR@1.3.4.4')
  api.use(['meteor-base','mongo','ecmascript','es5-shim','templating','blaze-html-templates'],['client','server'])
  api.addFiles('client/reactive-docker-status.js','client')
  api.addFiles('server/reactive-docker-status.js','server')
  api.addFiles('imports/collections.js',['client','server'])
  api.export('dockerStatusCreate','client')
  api.export('dockerStatus','client')
})
