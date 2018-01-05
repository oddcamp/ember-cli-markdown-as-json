'use strict';

const StaticSiteJson = require('./broccoli/markdown-to-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var defaultOptions = require('./addon/config/default.json')

function getConfig(options) {
  for (var option in defaultOptions) {
    if (!options.hasOwnProperty(option)) {
      options[option] = defaultOptions[option];
    }
  }

  return options;
}

module.exports = {
  name: 'ember-cli-markdown-as-json',
  isDevelopingAddon: function() {
    return true;
  },
  config: function (env, baseConfig) {
    var options = baseConfig['ember-cli-markdown-as-json'] || {};

    options = getConfig(options);
    this.configOptions = options;
  },

  postprocessTree(type, tree) {
    if (type !== 'all' || this.app.options.__is_building_fastboot__) {
      return tree;
    }

    const jsonTree =  new StaticSiteJson(
      this.configOptions.folder, this.configOptions
    );

    return new BroccoliMergeTrees([tree, ...[jsonTree]]);
  }
};
