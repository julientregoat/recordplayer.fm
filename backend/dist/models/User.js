'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _sequelize = require('../sequelize');

var User = _sequelize.sequelize.define('user', {
  username: {
    type: _sequelize.Sequelize.STRING
  },
  password_digest: {
    type: _sequelize.Sequelize.STRING
  },
  discogs_username: {
    type: _sequelize.Sequelize.STRING
  },
  oauth_token: {
    type: _sequelize.Sequelize.STRING
  },
  oauth_token_secret: {
    type: _sequelize.Sequelize.STRING
  }
});

User.sync().then(console.log);

exports.User = User;