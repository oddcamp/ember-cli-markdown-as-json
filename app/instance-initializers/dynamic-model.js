import ContentModel from 'ember-cli-markdown-as-json/models/content';
import DS from 'ember-data';
import ENV from '../config/environment';

export function initialize() {
  const config = ENV['ember-cli-markdown-as-json'];
  let mixin = {};
  if (Array.isArray(config.attributes)) {
    config.attributes.forEach(attr => mixin[attr] = DS.attr('string'));
  } else {
    Object.keys(config.attributes).forEach(
      attr => mixin[attr] = DS.attr(config.attributes[attr])
    );
  }

  ContentModel.reopen(mixin);
}

export default {
  name: 'dynamic-company-model',
  after: 'ember-data',
  initialize
};
