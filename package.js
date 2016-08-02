// packages/cunnagin:reactive-docker-status/package.js

Package.describe({
  summary: 'Provides a reactive collection update for monitoring a docker server status',
  version: "1.0.2",
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
  api.add_files('client/reactive-docker-status.js','client')
  api.add_files('server/reactive-docker-status.js','server')
  api.add_files('imports/collections.js',['client','server'])
  api.export('dockerStatusCreate','client')
})
