'use strict';
module.exports = (sequelize, DataTypes) => {
  var Release = sequelize.define('Release', {
    title: DataTypes.STRING,
    catno: DataTypes.STRING,
    discogs_id: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {});
  Release.associate = function(models) {
    Release.belongsTo(models.Label)
    Release.hasMany(models.Track)
    Release.belongsToMany(models.Artist, {through: 'ArtistReleases'})
  };
  return Release;
};
