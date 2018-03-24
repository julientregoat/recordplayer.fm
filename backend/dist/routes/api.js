'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./api/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();


api.use('/users', _users2.default);

api.get('/', function (req, res) {
  res.json({ error: 'invalid location' });
});

exports.default = api;