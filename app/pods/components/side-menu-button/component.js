import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    // initialize the jPushMenu with jQuery
    this.$('.toggle-menu').jPushMenu();
  }
});
