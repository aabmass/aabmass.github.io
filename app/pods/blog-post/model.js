import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr('string'),
  subtitle: attr('string'),
  pubDate: attr('date'),
  contentFile: attr('string')
});
