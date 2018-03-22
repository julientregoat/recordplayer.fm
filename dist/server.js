'use strict';

var _env = require('./env');

var express = require('express');
var bodyParser = require('body-parser');
var babel = require('babel-core');

var DiscogsClient = require('disconnect').Client;
var Discogs = new DiscogsClient('recordplayer.fm/0.0.1');
var discogsDB = new DiscogsClient().database();


var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

router.route('/').get(function (req, res) {
  res.json({ message: "test" });
});

router.route('/callback').get(function (req, res) {
  var oAuth = new DiscogsClient(requestData).oauth();
  oAuth.getAccessToken(req.query.oauth_verifier, // Verification code sent back by Discogs
  function (err, accessData) {
    // Persist "accessData" here for following OAuth calls
    res.send('Received access token!');
  });
});

router.route('/authorize').get(function (req, res) {
  var oAuth = new DiscogsClient().oauth();
  oAuth.getRequestToken(_env.CONSUMER_KEY, _env.CONSUMER_SECRET, 'http://localhost:3001/api/callback', function (err, requestData) {
    console.log(err, "requestData", requestData);
    // Persist "requestData" here so that the callback handler can
    // access it later after returning from the authorize url
    res.redirect(requestData.authorizeUrl);
  });
});

app.listen(port, function () {
  console.log('api running on port ' + port);
});