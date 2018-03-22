'use strict';

var DiscogsClient = require('disconnect').Client;
var Discogs = new DiscogsClient('recordplayer.fm/0.0.1');
var discogsDB = new DiscogsClient().database();