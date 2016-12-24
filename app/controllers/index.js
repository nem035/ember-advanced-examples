import Ember from 'ember';

const {
  Controller,
  computed: {
    readOnly
  }
} = Ember;

export default Controller.extend({
  lat: readOnly('location.lat'),
  lng: readOnly('location.lng'),

  host: readOnly('headers.host'),
  userAgent: readOnly('headers.userAgent'),
});
