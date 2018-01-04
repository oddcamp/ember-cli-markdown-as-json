import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

export default DS.Model.extend({
  content: DS.attr('string'),
  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  index: DS.attr('number'),
  url: DS.attr('string'),
  linkName: DS.attr('string'),

  @computed('url')
  get isIndex() {
    return !this.get('url') || this.get('url') === '/';
  }
});
