'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../../models');

var _env = require('../../env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DiscogsClient = require('disconnect').Client;


var users = _express2.default.Router();
var bcrypt = require('bcrypt');

users.route('/').get(function (req, res) {
  // User.findById(1)
  // .then(user => user.getPlaylists({where: {name: "Collection"}}))
  // .then(playlists => playlists[0].getTracks())
  // .then(console.log)
  res.json({ message: "working" });
}).post(function (req, res) {

  // hashing password for security
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    // creating default playlist 'collection' for the user
    return Promise.all([_models.User.create({ username: req.body.username, email: req.body.email, password_digest: hash }), _models.Playlist.create({ name: "Collection" })]);
  }).then(function (result) {
    res.json({ user: result[0] });
    return result[0].addPlaylist(result[1]);
  }).then(console.log).catch(function (error) {
    return res.json({ error: error });
  });
});

users.route('/:id').get(function (req, res) {
  var id = req.params.id;
  _models.User.findById(id).then(function (user) {
    return res.json(user);
  });
});

users.route('/:id/collection').get(function (req, res) {
  var id = req.params.id;
  _models.User.findById(id).then(function (user) {
    return user.getPlaylists({ where: { name: 'Collection' } });
  }).then(function (playlists) {
    return playlists[0].getTracks({ include: [{ model: _models.Video }] });
  }).then(function (tracks) {
    return res.json({ tracks: tracks });
  });
});

users.route('/session').post(function (req, res) {
  var selectedUser = void 0;
  _models.User.find({ where: { username: req.body.username } }).then(function (user) {
    selectedUser = user;
    return bcrypt.compare(req.body.password, user.password_digest);
  }).then(function (result) {
    if (result) {
      res.json({ user: selectedUser });
    } else {
      res.json({ error: "User not found or password is incorerct." });
    }
  }).catch(function (error) {
    return res.json({ error: "User not found or password is incorerct." });
  });
});

exports.default = users;