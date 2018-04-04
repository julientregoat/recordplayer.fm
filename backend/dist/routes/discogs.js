'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../models');

var _env = require('../../env.js');

var _discogsWorker = require('../lib/discogsWorker');

var _discogsWorker2 = _interopRequireDefault(_discogsWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discogs = _express2.default.Router();

var DiscogsClient = require('disconnect').Client;


// how dangerous are these variables? can they be overwritten if two people overlap when authorizing discogs accounts?

var userID = void 0;
var userIdentity = void 0;
// to store initial request data for later
var requestData = void 0;
// to store access data for later
var accessData = void 0;
var authorizedClient = void 0;

// gotta be a better way to authorize a user, maybe on the front end?

// to be more secure, check if the user has already authorized. then, if they have, they shouldn't be allowed to reauth. then it should be fine

discogs.get('/test', function (req, res) {
	var client = void 0;
	_models.User.findById(1).then(function (user) {
		// client = new DiscogsClient({method: 'oauth', level: 2, consumerKey: CONSUMER_KEY, consumerSecret: CONSUMER_SECRET, token: user.oauth_token, token_secret: user.oauth_token_secret})
		return user.getPlaylists();
	}).then(function (playlists) {
		return playlists[0].getTracks();
	}).then(function (tracks) {
		return console.log(tracks.length);
	});
});

discogs.get('/authorize', function (req, res) {
	userID = req.query['user'];
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
		(0, _discogsWorker2.default)(authorizedClient, userID);
		authorizedClient.getIdentity(function (err, data) {
			_models.User.findById(userID).then(function (user) {
				return user.update({ authenticated: true, discogs_username: data.username, oauth_token: accessData.token, oauth_token_secret: accessData.tokenSecret });
			}).then(console.log).catch(function (error) {
				return console.log('error', error);
			});
			// should start the discogs worker here for the account
			res.send('<script>window.close()</script>');
		});
	});
});

discogs.route('/worker').post(function (req, res) {
	console.log(req.body);
	_models.User.findById(req.body.id).then(function (user) {
		return (0, _discogsWorker2.default)(new DiscogsClient({ method: 'oauth', level: 2, consumerKey: _env.CONSUMER_KEY, consumerSecret: _env.CONSUMER_SECRET, token: user.oauth_token, token_secret: user.oauth_token_secret }), user.id);
	});
});

exports.default = discogs;