import DS from 'ember-data';
import ENV from '../config/environment';

console.log(ENV);

export default DS.Model.extend({
  content: DS.attr('string'),
  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  index: DS.attr('number'),
  url: DS.attr('string'),
  linkName: DS.attr('string'),
});
