import Express from 'express'
const discogs = Express.Router()

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../env'

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
			// Persist "requestData" here so that the callback handler can
			// access it later after returning from the authorize url
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
      authorizedClient.getIdentity(function(err, data){
        userIdentity = data
        res.redirect('/discogs/user')
      })
		}
	)
})

discogs.get('/user', (req, res) => {
  res.json({user: userIdentity})
})

// dis.getReleases("jtregoat", 0, {page: 2, per_page: 75}, function (err, data){
//   console.log("collection", err, data)
//   res.json(data)
// })

export default discogs
