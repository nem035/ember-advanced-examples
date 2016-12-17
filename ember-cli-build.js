/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var CustomHeaderPlugin = require('./plugins/custom-header');

var debugTree = require('broccoli-stew').debug;
var logTree = require('broccoli-stew').log;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here 
  });

  return new CustomHeaderPlugin(app.toTree());
};
