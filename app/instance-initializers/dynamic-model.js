import ContentModel from 'ember-cli-markdown-as-json/models/content';
import DS from 'ember-data';
import ENV from '../config/environment';

export function initialize() {
  console.log(ENV);
  ContentModel.reopen({
    title: DS.attr('string'),
    subtitle: DS.attr('string'),
  });
}

export default {
  name: 'dynamic-company-model',
  after: 'ember-data',
  initialize
};
