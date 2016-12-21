import {
  module,
  test,
} from 'qunit';

import Ember from 'ember';
import destroyApp from '../../helpers/destroy-app';
import {
  initialize,
} from 'ember-advanced-examples/initializers/geolocation';

module('Unit | Initializer | geolocation', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.application.deferReadiness();
    });
  },

  afterEach() {
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function (assert) {
  initialize(this.application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
