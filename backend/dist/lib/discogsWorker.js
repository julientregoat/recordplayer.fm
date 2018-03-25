'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('../../models/index.js'),
    Playlist = _require.Playlist,
    Artist = _require.Artist,
    Label = _require.Label,
    Release = _require.Release,
    Track = _require.Track,
    Video = _require.Video;

// gonna need to refactor this behemoth

function strftSeconds(seconds) {
  var minutes = parseInt(seconds) / 60;
  var remainingSeconds = parseInt(seconds) % 60;
  return minutes + ":" + remainingSeconds;
}

function trackParser(client, releaseInst, userCollection) {
  console.log(releaseInst.discogs_id);
  client.database().getRelease(releaseInst.discogs_id).then(function (release) {
    release.tracklist.forEach(function (track) {
      // if there's no matching release, just use the first one
      var video = release.videos.find(function (video) {
        return video.title.includes(track.title);
      }) || release.videos[0];
      Promise.all([Video.findOrCreate({ where: { title: video.title, duration: strftSeconds(video.duration), youtube_id: video.uri.split('v=')[1] } }), Track.findOrCreate({ where: { title: track.title, position: track.position } })]).then(function (results) {
        // packaged in an array of arrays of the objs you wanted
        var video = results[0][0];
        var track = results[1][0];

        video.addTrack(track);
        releaseInst.addTrack(track);
        userCollection.addTrack(track);
      });
    });
  });
}

function discogsWorker(client, userId) {
  var playlist = void 0;
  var pageCount = void 0;
  var userReleaseIds = void 0;
  var timeout = 5000;

  // finding the user's main 'collection playlist to fill with tracks'
  Playlist.findOrCreate({ where: { name: "Collection", UserId: userId } }).then(function (result) {
    playlist = result[0];
    return client.user().collection().getReleases('jtregoat', 0, { page: 1, per_page: 250 });
  }).then(function (collection) {
    pageCount = collection.pagination.pages;
    for (var i = 1; i <= pageCount; i++) {
      client.user().collection().getReleases("jtregoat", 0, { page: i, per_page: 250 }).then(function (info) {
        info.releases.forEach(function (release) {
          Release.findOrCreate({ where: {
              title: release.basic_information.title,
              catno: release.basic_information.labels[0].catno,
              discogs_id: release.basic_information.id,
              year: release.basic_information.year } }).spread(function (releaseInst, created) {

            // finding or creating each artist per release and associating release to it (many to many)
            release.basic_information.artists.forEach(function (artist) {
              return Artist.findOrCreate({ where: { name: artist.name, discogs_id: artist.id } }).spread(function (artistInst, created) {
                return artistInst.addRelease(releaseInst);
              });
            });

            // finding or creating each label per release and associating the release to it (belongs to)
            release.basic_information.labels.forEach(function (label) {
              return Label.findOrCreate({ where: { name: label.name, discogs_id: label.id } }).spread(function (labelInst, created) {
                return labelInst.addRelease(releaseInst);
              });
            });

            // this is getting better as far as rate limiting, still running into it a little though.
            setTimeout(function () {
              return trackParser(client, releaseInst, playlist);
            }, timeout += 2500);
          });
        });
      });
    }
  });
}

exports.default = discogsWorker;