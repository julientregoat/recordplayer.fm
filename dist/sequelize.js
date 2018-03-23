'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequelize = require('sequelize');

var sequelize = new Sequelize('recordplayer', 'nodedb', 'nodedb', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;

// create_table "artists", force: :cascade do |t|
//   t.string "name"
//   t.integer "discogs_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end
//
// create_table "artists_releases", force: :cascade do |t|
//   t.integer "artist_id"
//   t.integer "release_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
//   t.index ["artist_id"], name: "index_artists_releases_on_artist_id"
//   t.index ["release_id"], name: "index_artists_releases_on_release_id"
// end
//
// create_table "labels", force: :cascade do |t|
//   t.string "name"
//   t.integer "discogs_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end
//
// create_table "playlists", force: :cascade do |t|
//   t.string "name"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end
//
// create_table "playlists_tracks", force: :cascade do |t|
//   t.integer "playlist_id"
//   t.integer "track_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
//   t.index ["playlist_id"], name: "index_playlists_tracks_on_playlist_id"
//   t.index ["track_id"], name: "index_playlists_tracks_on_track_id"
// end
//
// create_table "release_videos", force: :cascade do |t|
//   t.integer "release_id"
//   t.integer "video_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
//   t.index ["release_id"], name: "index_release_videos_on_release_id"
//   t.index ["video_id"], name: "index_release_videos_on_video_id"
// end
//
// create_table "releases", force: :cascade do |t|
//   t.string "title"
//   t.integer "label_id"
//   t.string "catno"
//   t.integer "discogs_id"
//   t.integer "year"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
//   t.index ["label_id"], name: "index_releases_on_label_id"
// end
//
// create_table "tracks", force: :cascade do |t|
//   t.string "title"
//   t.string "position"
//   t.integer "release_id"
//   t.integer "video_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
//   t.index ["release_id"], name: "index_tracks_on_release_id"
//   t.index ["video_id"], name: "index_tracks_on_video_id"
// end
//
// create_table "users", force: :cascade do |t|
//   t.string "username"
//   t.string "password_digest"
//   t.string "email"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end
//
// create_table "videos", force: :cascade do |t|
//   t.string "title"
//   t.string "duration"
//   t.string "video_id"
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end

// previous methods

// def import_collection(username=USER)
//   i = 1
//   while i <= WRAPPER.get_user_collection(username, per_page: 100).pagination.pages
//     collection_page = WRAPPER.get_user_collection(username, page: i, per_page: 100).releases
//     collection_page.each do |release|
//       info = release.basic_information
//       new_release = Release.find_or_create_by(title: info.title, catno: info.labels.first.catno, discogs_id: info.id, year: info.year)
//       info.artists.each do |artist|
//         new_release.artists << Artist.find_or_create_by(name: artist.name, discogs_id: artist.id)
//       end
//       release_label = Label.find_or_create_by(name: info.labels.first.name, discogs_id: info.labels.first.id)
//       release_label.releases << new_release
//     end
//     i += 1
//   end
// end
//
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