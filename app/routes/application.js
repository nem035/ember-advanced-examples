import Ember from 'ember';

const {
  Route,
  getOwner,
} = Ember;

export default Route.extend({

  setupController(controller) {
    // Grab the request headers from the container
    controller.set('headers', getOwner(this).lookup('data:request-headers'));
  }
});
