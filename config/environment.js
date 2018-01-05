/* jshint node:true */
'use strict';

var objectAssign = require('object-assign');
var defaultOptions = require('../addon/config/default.json')

/**
 * Export the default config
 */
module.exports = function(environment, appConfig) {
  appConfig['ember-cli-markdown-as-json'] = objectAssign(
    defaultOptions,
    appConfig['ember-cli-markdown-as-json'] || {}
  );

  return { };
};
