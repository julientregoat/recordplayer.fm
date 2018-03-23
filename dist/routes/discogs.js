'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _env = require('../env');

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
		// Persist "requestData" here so that the callback handler can
		// access it later after returning from the authorize url
		res.redirect(requestData.authorizeUrl);
	});
});

discogs.route('/callback').get(function (req, res) {
	var oAuth = new DiscogsClient(requestData).oauth();
	oAuth.getAccessToken(req.query.oauth_verifier, // Verification code sent back by Discogs
	function (err, data) {
		accessData = data;
		authorizedClient = new DiscogsClient(accessData);
		authorizedClient.getIdentity(function (err, data) {
			userIdentity = data;
			res.redirect('/discogs/user');
		});
	});
});

discogs.get('/user', function (req, res) {
	res.json({ user: userIdentity });
});

// dis.getReleases("jtregoat", 0, {page: 2, per_page: 75}, function (err, data){
//   console.log("collection", err, data)
//   res.json(data)
// })

exports.default = discogs;