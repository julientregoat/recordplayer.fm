'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    duration: DataTypes.STRING,
    youtube_id: DataTypes.STRING
  }, {});
  Video.associate = function(models) {
    Video.hasMany(models.Track)
  };
  return Video;
};
