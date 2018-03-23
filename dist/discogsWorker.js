'use strict';

var _env = require('./env');

var DiscogsClient = require('disconnect').Client;


var oAuth = new DiscogsClient().oauth();
oAuth.getRequestToken(_env.CONSUMER_KEY, _env.CONSUMER_SECRET, 'http://localhost:3001/api/callback', function (err, requestData) {
  var authReq = requestData;
  // Persist "requestData" here so that the callback handler can
  // access it later after returning from the authorize url
  res.redirect(requestData.authorizeUrl);
});