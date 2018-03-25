'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _express2.default.Router();
var bcrypt = require('bcrypt');

users.route('/').get(function (req, res) {
  _models.User.findById(1).then(function (user) {
    return user.getPlaylists();
  }).then(console.log);
}).post(function (req, res) {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    return _models.User.create({ username: req.body.username, email: req.body.email, password_digest: hash });
  }).then(function (result) {
    return res.json({ result: result });
  }).catch(function (error) {
    return res.json({ error: error });
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