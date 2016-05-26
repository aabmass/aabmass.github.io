import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('markdown-file-latex', 'Integration | Component | markdown file latex', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{markdown-file-latex}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#markdown-file-latex}}
      template block text
    {{/markdown-file-latex}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
