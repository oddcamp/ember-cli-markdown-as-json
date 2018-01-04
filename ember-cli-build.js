/* eslint-env node */
'use strict';

const StaticSiteJson = require('./broccoli/markdown-to-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

const jsonTree =  new StaticSiteJson('content', {
  contentFolder: 'content'
});

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return new BroccoliMergeTrees([app.toTree(), ...[jsonTree]]);
};
