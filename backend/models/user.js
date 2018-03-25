'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          User.find({where: {username: value}})
          .then(res => {
            if (res){
              throw new Error('Username is already taken.')
            }
            next()
          })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function (value, next) {
          User.find({where: {email: value}})
          .then(res => {
            if (res){
              throw new Error('Email is already in use.')
            }
            next()
          })
        }
      }},
    password_digest: DataTypes.STRING,
    authenticated: DataTypes.BOOLEAN,
    discogs_username: DataTypes.STRING,
    oauth_token: DataTypes.STRING,
    oauth_token_secret: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Playlist)
  };
  return User;
};
