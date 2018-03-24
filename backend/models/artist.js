'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    discogs_id: DataTypes.INTEGER
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
  };
  return Artist;
};