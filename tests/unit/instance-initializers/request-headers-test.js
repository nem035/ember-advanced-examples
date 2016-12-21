import {
  module,
  test,
} from 'qunit';

import Ember from 'ember';
import destroyApp from '../../helpers/destroy-app';
import {
  initialize,
} from 'ember-advanced-examples/instance-initializers/request-headers';

module('Unit | Instance Initializer | request headers', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },

  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function (assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
