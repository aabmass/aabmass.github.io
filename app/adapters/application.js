import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'fauxapi',

  /* override buildURL to give the simpler scheme */
  buildURL() {
    //  simply append .json
    return this._super(...arguments) + '.json';
  }
});
