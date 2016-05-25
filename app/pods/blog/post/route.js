import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('blog-post', params.id);
  },
  actions: {
    error(reason, transition) {
      const error = reason.errors[0];

      // redirect to page-not-found route for a 404
      if (error.status == 404) {
        // slice off the leading '/'
        var pathToWrite = transition.intent.url.slice(1);

        this.transitionTo('page-not-found', pathToWrite);
      }
    }
  }
});
