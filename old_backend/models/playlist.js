'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User)
    Playlist.belongsToMany(models.Track, {through: 'PlaylistTracks'})
  };
  return Playlist;
};
