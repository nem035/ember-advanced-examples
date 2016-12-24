import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import config from '../config/environment';

const {
  inject: {
    service
  }
} = Ember;

export default ToriiAuthenticator.extend({
  torii: service(),

  ajax: Ember.inject.service(),

  authenticate() {
    const ajax = this.get('ajax');
    const tokenExchangeUri = config.torii.providers['github-oauth2'].tokenExchangeUri;

    return this._super(...arguments).then((data) => {
      const {
        authorizationCode: code,
        provider
      } = data;

      return ajax.request(`${tokenExchangeUri}/authenticate/${code}`, {
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json'
      }).then(({
        token: access_token
      }) => {
        return {
          access_token,
          provider
        };
      });
    });
  }
});
