module.exports = function (env) {
  var redirectUri, apiKey, suffix = '/auth/callback';

  if (env === 'development') {
    apiKey = '3a830116d770d080b079';
    redirectUri = 'http://localhost:4200' + suffix;
  } else {
    apiKey = '97c29cbf15994229a669';
    redirectUri = 'https://ember-advanced-examples.herokuapp.com' + suffix;
  }

  return {
    apiKey: apiKey,
    redirectUri: redirectUri
  };
}
