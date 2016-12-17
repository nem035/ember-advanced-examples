import Ember from 'ember';

// Request access to geolocation data and ensure the app doesn't start up until we have it
export function initialize(application) {

  // defer application booting until we obtain geolocation data
  application.deferReadiness();

  // request geolocation data
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const {
      latitude: lat,
      longitude: lng
    } = coords;

    // we got the geolocation data, application is ready to continue booting
    application.advanceReadiness();
    Ember.runInDebug(() => {
      Ember.Logger.info(
        `registering "data:location": { lat: ${lat}, lng: ${lng}`
      );
    });

    // register geolocation data
    application.register('data:location', {
      lat,
      lng
    }, {
      instantiate: false
    });

    // inject geolocation data into all all factories of the type 'controller'
    // with the name 'location'
    application.inject('controller', 'location', 'data:location');
  });

}

export default {
  name: 'geolocation',
  initialize
};
