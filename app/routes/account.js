import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    // ember-data-github addon uses "#" as a special ID value to indicate the current user.
    return this.get('store').findRecord('github-user', '#');
  },
});
