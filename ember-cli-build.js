/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var stew = require('broccoli-stew');
var pkg = require('./package.json');
var path = require('path');

function appendHeader(content, relativePath) {
  return relativePath.includes('fastboot') ?
    content :
    `/**
* ${path.basename(relativePath)}
*
* author: ${pkg.author}
* generated at: ${new Date().toISOString()}
*
*/
${content}`;
}

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['images/nejo.jpg'] // exclude fingerprinting for the image
    },

    'ember-cli-qunit': {
      useLintTree: false,
    },

    dotEnv: {
      clientAllowedKeys: [
        'GITHUB_CLIENT_ID',
        'GITHUB_REDIRECT_URI',
        'GITHUB_TOKEN_EXCHANGE_URL'
      ],
      path: {
        development: './.env.development',
        test: './.env.test',
        production: './.env.production'
      }
    }
  });

  // add custom banner to each javascript and css file
  return stew.map(
    app.toTree(),
    '**/*.{js,css}',
    appendHeader
  );
};
