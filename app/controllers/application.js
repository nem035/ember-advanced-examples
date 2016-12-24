import Ember from 'ember';

const {
  Controller,
  inject: {
    service
  }
} = Ember;

export default Controller.extend({

  session: service(),
  error: undefined,

  actions: {
    login() {
      this.get('session')
        .authenticate('authenticator:torii', 'github')
        .then(() => this.transitionToRoute('account'))
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
