'use strict';
module.exports = (sequelize, DataTypes) => {
  var Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    position: DataTypes.STRING,
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.Release)
    Track.belongsTo(models.Video)
    Track.belongsToMany(models.Playlist, {through: 'PlaylistTracks'})
  };
  return Track;
};

// will I ever need to add the proper fields here or?
