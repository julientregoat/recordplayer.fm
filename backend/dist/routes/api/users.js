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
  _models.User.findAll().then(function (result) {
    return res.json(result);
  });
}).post(function (req, res) {
  console.log(req.body);
  // manual validations I guess
  // User.find({where: {username: 'jtregoat'}})
  // .then(result => {
  //   if (result){
  //     return res.json({error: "username already exists"})
  //   }
  // })
  _models.User.build({ username: 'jtregoat' }).save().then(function (poop) {
    return console.log('transaction complete', poop);
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