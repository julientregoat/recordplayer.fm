import Express from 'express'
const discogs = Express.Router()

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../env'

import discogsWorker from '../lib/discogsWorker'

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


let userIdentity;
// to store initial request data for later
let requestData;
// to store access data for later
let accessData;
let authorizedClient;

discogs.get('/authorize', (req, res) => {
  // NOPE -- user must make account first.
  // THEN, they have to authorize their account
  // perhaps this should be done first, before any other user info is taken
  // then, you can return user info to the frontend with which they can submit it back to the back end in one go for
  // no, it has to be done last
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
