import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from 'ember';

const {
  Route,
  getOwner
} = Ember;

export default Route.extend(ApplicationRouteMixin, {

  setupController(controller) {
    const container = getOwner(this);

    controller.setProperties({
      location: container.lookup('data:location'),
      headers: container.lookup('data:request-headers')
    });
  }
});
