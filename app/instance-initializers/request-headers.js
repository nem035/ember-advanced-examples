import Ember from 'ember';

export function initialize(appInstance) {

  // lookup the fastboot service
  const fastboot = appInstance.lookup('service:fastboot');

  // satisfy phantomJS test environment
  if (!fastboot) {
    return;
  }

  // obtain the shoebox from the fastboot service
  const shoebox = fastboot.get('shoebox');

  // retrieve the shoebox we need
  let shoeboxStore = shoebox.retrieve('shoebox-request-headers');

  // make sure we're running this code on the server
  if (fastboot.get('isFastBoot')) {

    // retrieve the headers
    const headers = fastboot.get('request.headers');

    // only retrieve the host and the user-agent for simplicity purposes
    const storedHeaders = {
      host: headers.get('host'),
      userAgent: headers.get('user-agent')
    };

    // log information if we're in debug environment
    Ember.runInDebug(() => {
      Ember.Logger.info(
        `registering "data:request-headers": {
          host: ${storedHeaders.host},
          userAgent: ${storedHeaders.userAgent}
        }`
      );
    });

    // register request headers in the container
    appInstance.register('data:request-headers', storedHeaders, {
      instantiate: false
    });

    // lazily create the store
    if (!shoeboxStore) {
      shoeboxStore = {};
      shoebox.put('shoebox-request-headers', shoeboxStore);
    }

    // put the headers in the store
    shoeboxStore.headers = JSON.stringify(storedHeaders);

    /*
    Something like this should be a part of the initially loaded index.html

    (Check in View Page Source)

    <script type="fastboot/shoebox" id="shoebox-shoebox-request-headers">{"headers":"{\"host\":\"localhost:3000\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML\"}"}</script>
    */
  } else if (shoeboxStore) {
    // otherwise we're not on the server
    // if the shoebox is not there then
    // we're hosting a static file and cannot obtain request headers
    const storedHeaders = JSON.parse(shoeboxStore.headers);


    // log information if we're in debug environment
    Ember.runInDebug(() => {
      Ember.Logger.info(
        `registering "data:request-headers": {
          host: ${storedHeaders.host},
          userAgent: ${storedHeaders.userAgent}
        }`
      );
    });

    appInstance.register('data:request-headers', storedHeaders, {
      instantiate: false
    });
  }
}

export default {
  name: 'request-headers',
  initialize
};
