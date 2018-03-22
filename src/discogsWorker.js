const DiscogsClient = require('disconnect').Client
const Discogs = new DiscogsClient('recordplayer.fm/0.0.1');
const discogsDB = new DiscogsClient().database();
