import Ember from 'ember';

const {
  Component,
  K: emptyFunction
} = Ember;

export default Component.extend({
  // passed in
  isAuthenticated: false,
  error: null,
  loginAction: emptyFunction,
  logoutAction: emptyFunction,
  clearErrorAction: emptyFunction,

  // local
  tagName: 'nav',
  classNames: ['navbar'],
  classNameBindings: ['error:has-error', 'isAuthenticated:authenticated']
});
