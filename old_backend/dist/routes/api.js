'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./api/users');

var _users2 = _interopRequireDefault(_users);

var _playlists = require('./api/playlists');

var _playlists2 = _interopRequireDefault(_playlists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

api.get('/', function (req, res) {
  // add a 404 status here
  res.json({ error: 'invalid endpoint' });
});

api.use('/users', _users2.default);

api.use('/playlists', _playlists2.default);

exports.default = api;