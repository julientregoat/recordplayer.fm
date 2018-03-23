'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('../sequelize');

var User = _sequelize.sequelize.define('user', {
  username: {
    type: _sequelize.Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUnique: function isUnique(value) {
        User.find({ where: { username: value } }).then(console.log);
      }
    }
  },
  email: {
    type: _sequelize.Sequelize.STRING
  },
  password_digest: {
    type: _sequelize.Sequelize.STRING
  },
  authenticated: {
    type: _sequelize.Sequelize.BOOLEAN,
    defaultValue: false
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

exports.default = User;