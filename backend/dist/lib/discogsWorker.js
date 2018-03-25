'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('../../models/index.js'),
    Playlist = _require.Playlist,
    Artist = _require.Artist,
    Label = _require.Label,
    Release = _require.Release;

// gonna need to refactor this behemoth

function trackParser(client, releaseDiscogsId) {
  client.database().getRelease(releaseDiscogsId).then(console.log);
}

function discogsWorker(client, userId) {
  var playlist = void 0;
  var pageCount = void 0;
  var userReleaseIds = void 0;
  var timeout = 10000;

  Playlist.find({ where: { name: "Collection", UserId: userId } }).then(function (result) {
    playlist = result;
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

            setTimeout(function () {
              return trackParser(client, release.discogs_id);
            }, timeout += 5000);
          });
        });
      });
    }
  });
}

exports.default = discogsWorker;