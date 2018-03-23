import Express from 'express'
const discogs = Express.Router()

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../env'

import discogsWorker from '../lib/discogsWorker'

let userIdentity;
// to store initial request data for later
let requestData;
// to store access data for later
let accessData;
let authorizedClient;

discogs.get('/authorize', (req, res) => {
	const oAuth = new DiscogsClient().oauth();
	oAuth.getRequestToken(
		CONSUMER_KEY,
		CONSUMER_SECRET,
		'http://localhost:3001/discogs/callback',
		function(err, data){
      requestData = data;
			res.redirect(requestData.authorizeUrl);
		}
	);
});

discogs.route('/callback').get((req, res) => {
  const oAuth = new DiscogsClient(requestData).oauth();
	oAuth.getAccessToken(
		req.query.oauth_verifier, // Verification code sent back by Discogs
		function(err, data){
			accessData = data;
      authorizedClient = new DiscogsClient(accessData)
      // should handle storing user info in DB here?
      authorizedClient.getIdentity(function(err, data){
        userIdentity = data
        res.redirect('/api/user')
      })
		}
	)
})

discogs.get('/user', (req, res) => {
  // should route to API for user model.
  // maybe if routing to created account different vs login?
  res.json({user: userIdentity})
  discogsWorker(authorizedClient)
})

export default discogs
