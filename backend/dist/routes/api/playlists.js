'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DiscogsClient = require('disconnect').Client;
var playlists = _express2.default.Router();
var bcrypt = require('bcrypt');

// need to implement JWT for access to this info, make sure a user has access to only THEIR playlists
// should handle creation of playlists here to be RESTful biatch
playlists.route('/').get(function (req, res) {
  return res.json({ message: 'playlists api endpoint. maybe should view most recent public playlists here' });
}).post(function (req, res) {
  console.log('new playlist: ', req.body);
  res.json({ message: "new playlist creation" });
});

// def will need auth here
// will need to be able to patch and delete these
playlists.route('/:playlist_id').get(function (req, res) {
  _models.Playlist.findById(req.params.playlist_id, {
    include: [{ model: _models.User, attributes: ['id', 'username'] }, { model: _models.Track }],
    attributes: ['id', 'name', 'UserId'] }).then(function (playlist) {
    return res.json(playlist);
  });
});

exports.default = playlists;