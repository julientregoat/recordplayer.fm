'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = _express2.default.Router();

users.route('/').get(function (req, res) {
  res.json({ message: "api/users" });
}).post(function (req, res) {
  console.log(req.body);
  // man validations I guess
  _models.User.find({ where: { username: 'jtregoat' } }).then(console.log);
  _models.User.build({ username: 'jtregoat' }).save().then(function () {
    return console.log('transaction complete');
  }).catch(function (err) {
    return console.log('error', err);
  });
  // .then(result => res.json(result))
  // test
});

users.route('/session').post(function (req, res) {
  res.json({ message: 'login' });
}).delete(function (req, res) {
  res.json({ message: 'logout' });
});

exports.default = users;