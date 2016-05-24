import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,

  /* for google analytics a la ember-metrics */
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    
    // inject analytics js into page
    this._trackPage();
  },
  
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      this.get('metrics').trackPage('GoogleAnalytics', { page, title });
    });
  }
});

Router.map(function() {
  this.route('blog', function() {
    this.route('post', {
      path: '/post/:id'
    });
  });

  // this is the catch-all 404 route
  this.route('page-not-found', {
    path: '*path'
  });
});

export default Router;
