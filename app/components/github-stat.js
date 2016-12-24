import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  // passed in
  name: null,
  value: null,

  // local
  classNames: ['github-stat', 'animated', 'zoomIn']
});
