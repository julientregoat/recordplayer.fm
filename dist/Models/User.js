'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _sequelize = require('../sequelize');

var User = _sequelize.sequelize.define('user', {
  firstName: {
    type: _sequelize.Sequelize.STRING
  },
  lastName: {
    type: _sequelize.Sequelize.STRING
  }
});

User.sync().then(console.log);

exports.User = User;