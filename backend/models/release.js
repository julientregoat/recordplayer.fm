'use strict';
module.exports = (sequelize, DataTypes) => {
  var Release = sequelize.define('Release', {
    title: DataTypes.STRING,
    catno: DataTypes.STRING,
    discogs_id: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {});
  Release.associate = function(models) {
    // associations can be defined here
  };
  return Release;
};
