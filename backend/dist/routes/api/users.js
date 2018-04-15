'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DiscogsClient = require('disconnect').Client;
var users = _express2.default.Router();
var bcrypt = require('bcrypt');

// need to implement JWT for access to this info


// user creation

users.route('/').get(function (req, res) {
  // what do I do with this get part?
  // User.findById(1)
  // .then(user => user.getPlaylists({where: {name: "Collection"}}))
  // .then(playlists => playlists[0].getTracks())
  // .then(console.log)
  res.json({ message: "user get / endpoint" });
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

// should session be moved to a different part of the API? user login stuff here

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

users.route('/:id').get(function (req, res) {
  var id = req.params.id;
  _models.User.findById(id).then(function (user) {
    return res.json(user);
  });
});

// get main collection

users.route('/:id/collection').get(function (req, res) {
  var id = req.params.id;
  // defaults if there is no query added
  var page = req.query.page || 0;
  var size = req.query.size || 100;
  var range = [size * page, size * page + 100];
  var totalPages = void 0;
  _models.User.findById(id)
  // maybe can use 'include' here to just grab the tracks
  .then(function (user) {
    return user.getPlaylists({ where: { name: 'Collection' } });
  }).then(function (playlists) {
    return Promise.all([
    // this can probably refactored into more of a 'find the collection playlist, and count the number of tracks within that'
    // especially since I'm already getting all tracks with 'playlists[0].getTracks', that can just be .count()-ed.
    _models.Track.findAndCountAll({
      include: [{
        model: _models.Playlist,
        where: {
          name: "Collection",
          UserId: id
        }
      }]
    }), playlists[0].getTracks({
      // refactor this to use build in Sequelize pagination queries
      where: {
        id: _defineProperty({}, _models.Sequelize.Op.between, range)
      },
      include: [{ model: _models.Video }, { model: _models.Release, include: { model: _models.Artist } }]
    })]);
  }).then(function (results) {
    res.json({
      totalPages: Math.ceil(results[0].count / size),
      tracks: results[1]
    });
  });
});

// specifically for a user's playlist. should this be a query 
// at the playlists route endpoint instead? or is this still convenient.
// should I nest everything playlist related under users, since it's one to many
users.route('/:id/playlists').get(function (req, res) {
  _models.User.findById(req.params.id).then(function (user) {
    return user.getPlaylists();
  }).then(function (playlists) {
    res.send(playlists);
  });
});

exports.default = users;