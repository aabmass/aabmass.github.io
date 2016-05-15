import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
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
