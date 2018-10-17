import DS from 'ember-data';
import { camelize } from '@ember/string';

export default DS.JSONAPIAdapter.extend({
  keyForAttribute(attr, method) {
    debugger;
    return camelize(attr);
  }
});
