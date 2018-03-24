'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    duration: DataTypes.STRING,
    youtube_id: DataTypes.STRING
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};