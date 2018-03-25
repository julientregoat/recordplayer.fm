import Express from 'express'
const discogs = Express.Router()

import { User } from '../../models'

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../env'
import discogsWorker from '../lib/discogsWorker'

// how dangerous are these variables? can they be overwritten if two people overlap when authorizing discogs accounts?

let userID;
let userIdentity;
// to store initial request data for later
let requestData;
// to store access data for later
let accessData;
let authorizedClient;

// gotta be a better way to authorize a user, maybe on the front end?

// to be more secure, check if the user has already authorized. then, if they have, they shouldn't be allowed to reauth. then it should be fine

discogs.get('/authorize', (req, res) => {
	userID = req.query['user']
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
      console.log(accessData)
      authorizedClient = new DiscogsClient(accessData)
      // should handle storing user info in DB here?
      authorizedClient.getIdentity(function(err, data){
				User.findById(userID)
				.then(user => user.update({authenticated: true, discogs_username: data.username, oauth_token: accessData.token, oauth_token_secret: accessData.tokenSecret}))
				.then(console.log)
				.catch(error => console.log('error', error))
				// should start the discogs worker here for the account
        res.send('<script>window.close()</script>')
      })
		}
	)
})
export default discogs
