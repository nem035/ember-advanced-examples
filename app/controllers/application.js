import Ember from 'ember';

const {
  Controller,
  computed: {
    readOnly
  },
  inject: {
    service
  }
} = Ember;

export default Controller.extend({
  lat: readOnly('location.lat'),
  lng: readOnly('location.lng'),

  host: readOnly('headers.host'),
  userAgent: readOnly('headers.userAgent'),

  session: service(),
  error: undefined,

  actions: {
    login() {
      this.get('session')
        .authenticate('authenticator:torii', 'github')
        .catch((error) => {
          this.set('error', error);
        });
    },

    logout() {
      this.get('session').invalidate();
    },

    clearError() {
      this.set('error', undefined);
    }
  }
});
