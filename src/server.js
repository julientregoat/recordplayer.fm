'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const babel = require('babel-core')

const DiscogsClient = require('disconnect').Client
const Discogs = new DiscogsClient('recordplayer.fm/0.0.1');
const discogsDB = new DiscogsClient().database();
import { CONSUMER_KEY, CONSUMER_SECRET } from './env'

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

router.route('/')
.get((req, res) => {
  res.json({message: "test"});
});

router.route('/callback').get((req, res) => {
  const oAuth = new DiscogsClient(requestData).oauth();
  	oAuth.getAccessToken(
  		req.query.oauth_verifier, // Verification code sent back by Discogs
  		function(err, accessData){
  			// Persist "accessData" here for following OAuth calls
  			res.send('Received access token!');
  		}
  	);
  });

router.route('/authorize').get((req, res) => {
	const oAuth = new DiscogsClient().oauth();
	oAuth.getRequestToken(
		CONSUMER_KEY,
		CONSUMER_SECRET,
		'http://localhost:3001/api/callback',
		function(err, requestData){
      console.log(err, "requestData", requestData)
			// Persist "requestData" here so that the callback handler can
			// access it later after returning from the authorize url
			res.redirect(requestData.authorizeUrl);
		}
	);
});

app.listen(port, () => {
 console.log(`api running on port ${port}`);
});
