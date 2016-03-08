import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('themed-syntax', 'Integration | Component | themed syntax', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{themed-syntax}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#themed-syntax}}
      template block text
    {{/themed-syntax}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
