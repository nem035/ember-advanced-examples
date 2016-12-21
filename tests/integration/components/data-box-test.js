import {
  moduleForComponent,
  test,
} from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-box', 'Integration | Component | data box', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs `{{data-box}}`);

  assert.equal(this.$().text().trim(), 'N/A');

  this.render(hbs `{{data-box data="test"}}`);

  assert.equal(this.$().text().trim(), 'test');

  // Template block usage:
  this.render(hbs `
    {{#data-box}}
      template block text
    {{/data-box}}
  `);

  assert.equal(this.$().text().trim(), 'N/A');
});
