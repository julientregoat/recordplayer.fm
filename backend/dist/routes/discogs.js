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


var userIdentity = void 0;
// to store initial request data for later
var requestData = void 0;
// to store access data for later
var accessData = void 0;
var authorizedClient = void 0;

discogs.get('/authorize', function (req, res) {
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