module.exports = function (env, isFastboot) {
  var redirectUri, apiKey;

  if (env === 'development') {
    if (isFastboot) {

    } else {
      apiKey = '3a830116d770d080b079';
      redirectUri = 'http://localhost:4200/auth/callback';
    }
  } else {

  }

  return {
    apiKey: apiKey,
    redirectUri: redirectUri
  };
}
