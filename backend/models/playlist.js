'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};