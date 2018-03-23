'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('../sequelize');

var User = _sequelize.sequelize.define('user', {
  username: {
    type: _sequelize.Sequelize.STRING,
    validate: {
      notEmpty: true
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
}, {
  validate: {
    isUnique: function isUnique() {
      User.find({ where: { username: this.username } }).then(function (result) {
        if (result) {
          throw new Error('username must be unique');
        }
      });
    }
  }
});

exports.default = User;