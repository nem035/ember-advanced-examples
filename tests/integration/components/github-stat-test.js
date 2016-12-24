import {
  moduleForComponent,
  test,
} from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';

moduleForComponent('github-stat', 'Integration | Component | github stat', {
  integration: true
});

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{github-stat}}`);

  assert.equal(this.$().text().trim(), '');
});
