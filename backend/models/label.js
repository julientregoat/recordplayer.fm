'use strict';
module.exports = (sequelize, DataTypes) => {
  var Label = sequelize.define('Label', {
    name: DataTypes.STRING,
    discogs_id: DataTypes.INTEGER
  }, {});
  Label.associate = function(models) {
    Label.hasMany(models.Release)
  };
  return Label;
};
