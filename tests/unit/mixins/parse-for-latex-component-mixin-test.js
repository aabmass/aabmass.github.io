import Ember from 'ember';
import ParseForLatexMixinMixin from 'aabmass-github-io/mixins/parse-for-latex-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | parse for latex mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let ParseForLatexMixinObject = Ember.Object.extend(ParseForLatexMixinMixin);
  let subject = ParseForLatexMixinObject.create();
  assert.ok(subject);
});
