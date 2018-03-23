'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _env = require('../env');

var _discogsWorker = require('../lib/discogsWorker');

var _discogsWorker2 = _interopRequireDefault(_discogsWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discogs = _express2.default.Router();

var DiscogsClient = require('disconnect').Client;


// TODO: OK SIGN UP AUTH FLOW
// user goes to react app. they sign up with
// their email, username, password, etc.
// this is created via the api/users/create portal.
//
// on creation, returns user_id to the react app
// login will work on same user_id for verification etc
//
// in that handshake, it will return user info - including if they're authenticated via discogs. if they're not,
// they won't really be able to access their library.
//
// main page will just be account info if they're not discogs authenticated?


var userIdentity = void 0;
// to store initial request data for later
var requestData = void 0;
// to store access data for later
var accessData = void 0;
var authorizedClient = void 0;

discogs.get('/authorize', function (req, res) {
  // NOPE -- user must make account first.
  // THEN, they have to authorize their account
  // perhaps this should be done first, before any other user info is taken
  // then, you can return user info to the frontend with which they can submit it back to the back end in one go for
  // no, it has to be done last
  var oAuth = new DiscogsClient().oauth();
  oAuth.getRequestToken(_env.CONSUMER_KEY, _env.CONSUMER_SECRET, 'http://localhost:3001/discogs/callback', function (err, data) {
    requestData = data;
    res.redirect(requestData.authorizeUrl);
  });
});

discogs.route('/callback').get(function (req, res) {
  var oAuth = new DiscogsClient(requestData).oauth();
  oAuth.getAccessToken(req.query.oauth_verifier, // Verification code sent back by Discogs
  function (err, data) {
    accessData = data;
    console.log(accessData);
    authorizedClient = new DiscogsClient(accessData);
    // should handle storing user info in DB here?
    authorizedClient.getIdentity(function (err, data) {
      userIdentity = data;
      res.redirect('/api/user');
    });
  });
});

discogs.get('/user', function (req, res) {
  // should route to API for user model.
  // maybe if routing to created account different vs login?
  res.json({ user: userIdentity });
  (0, _discogsWorker2.default)(authorizedClient);
});

exports.default = discogs;