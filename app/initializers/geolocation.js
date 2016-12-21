import Ember from 'ember';

// Request access to geolocation data and ensure the app doesn't start up until we have it
export function initialize(application) {

  // extract geolocation data only when running on the client
  if (typeof FastBoot === 'undefined') {
    // defer application booting until we obtain geolocation data
    application.deferReadiness();

    if ('geolocation' in navigator) {

      // request geolocation data
      navigator.geolocation.getCurrentPosition(({
        coords
      }) => {
        const {
          latitude,
          longitude
        } = coords;

        const lat = latitude.toPrecision(7);
        const lng = longitude.toPrecision(7);

        // we got the geolocation data, application is ready to continue booting
        application.advanceReadiness();

        // log information if we're in debug environment
        Ember.runInDebug(() => {
          Ember.Logger.info(
            `registering "data:location": { lat: ${lat}, lng: ${lng}`
          );
        });

        // register geolocation data
        // can be accessed from any factory instance using Ember.getOwner(this).lookup('data:location')
        application.register('data:location', {
          lat,
          lng
        }, {
          instantiate: false
        });
      });
    } else {
      Ember.runInDebug(() => {
        Ember.Logger.warn(
          'geolocation is not available'
        );
      });
    }
  }
}

export default {
  name: 'geolocation',
  initialize
};
