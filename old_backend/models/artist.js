'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    discogs_id: DataTypes.INTEGER
  }, {});
  Artist.associate = function(models) {
    Artist.belongsToMany(models.Release, {through: 'ArtistReleases'})
  };
  return Artist;
};
