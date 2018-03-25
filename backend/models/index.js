'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// if I sync when this starts, my join tables are made for me

db.sequelize.sync()

module.exports = db;

// def import_tracks_from_collection
//   requests = 0
//   Release.all.each do |release|
//     if requests >= 55
//       requests = 0
//       sleep(60)
//     end
//     release_info = WRAPPER.get_release(release.discogs_id)
//     release_info.tracklist.each do |track|
//       new_track = Track.find_or_create_by(position: track.position, title: track.title, release: release)
//       release.tracks << new_track
//       if release_info.videos
//         all_video_matches = release_info.videos.select do |video|
//           video.title.match(/\B#{track.title}|#{track.title}/i)
//         end
//         matched_video = all_video_matches.last
//         if matched_video
//           matched_video_id = matched_video.uri.split("watch?v=").last
//           new_video = Video.find_or_create_by(title: matched_video.title, duration: "#{matched_video.duration/60}:#{matched_video.duration%60}")
//           new_video.tracks << new_track
//           new_track.video.video_id = matched_video.uri.split("watch?v=").last
//           release.videos << new_video
//         end
//       end
//     end
//     requests += 1
//   end
// end
// end
//
