import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const {
  inject: {
    service
  }
} = Ember;

export default Torii.extend({
  torii: service()
});
