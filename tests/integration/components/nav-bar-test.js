import {
  moduleForComponent,
  test,
} from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs `{{nav-bar}}`);

  assert.equal(this.$().find('a').text().trim(), 'Login with Github');

  this.render(hbs `{{nav-bar isAuthenticated=true token="123"}}`);

  assert.equal(this.$().find('a').text().trim(), 'Logout');
  assert.equal(this.$().find('.banner').text().trim(), '😊 GitHub token: 123');
});
