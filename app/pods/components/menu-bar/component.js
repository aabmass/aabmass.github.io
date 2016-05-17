import Ember from 'ember';

var menusArr = [
  {
    entryName: 'My Github',
    link: 'https://github.com/aabmass'
  },
  {
    entryName: 'Portfolio',
    link: 'https://github.com/aabmass'
  },
  {
    entryName: 'Blog',
    route: 'blog'
  }
];

export default Ember.Component.extend({
  menus: menusArr
});
