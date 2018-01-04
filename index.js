'use strict';

const StaticSiteJson = require('./broccoli/markdown-to-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

const jsonTree =  new StaticSiteJson('content', {
  contentFolder: 'content'
});

module.exports = {
  name: 'ember-cli-markdown-as-json',
  isDevelopingAddon: function() {
    return true;
  },
  config: function (env, baseConfig) {
    var options = baseConfig.appVersion || {};
    /*

    var defaultOptions = {
      enabled: true,
      version: '0.0.0',
      showCreateDate: true,
      outputFile: '/current_version.txt'
    }

    for (var option in defaultOptions) {
      if (!options.hasOwnProperty(option)) {
        options[option] = defaultOptions[option];
      }
    }
    */

    this.appVersionOptions = options;
  },

  postprocessTree(type, tree) {
    if (type !== 'all' || this.app.options.__is_building_fastboot__) {
      return tree;
    }
    console.log(type);
    return new BroccoliMergeTrees([tree, ...[jsonTree]]);
  }

};