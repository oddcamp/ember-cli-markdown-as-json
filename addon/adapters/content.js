import DS from 'ember-data';

//TODO: we need to loop over all collections
//if none, then return the default content.json
export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    debugger;
    const config = Ember.getOwner(this).resolveRegistration(
      'config:environment'
    )['ember-cli-markdown-as-json'];

    if (requestType === 'queryRecord') {
      return `/${modelName}/${query.path}.json`;
    } else if(requestType === 'findAll' && modelName === 'content') {
      const collection = config.collections.find(i => i.src === 'content')
      if (collection) {
        return `${config.contentFolder}/${collection.output.replace('.json', '')}.json`;
      } else {
        return `${config.contentFolder}/${collection.output.replace('.json', '')}.json`;
      }
    }

    return this._super(...arguments);
  },
});

