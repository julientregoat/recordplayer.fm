'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('../../models/index.js'),
    Playlist = _require.Playlist,
    Artist = _require.Artist,
    Label = _require.Label,
    Release = _require.Release;

function discogsWorker(client, userId) {
  var playlist = void 0;
  var pageCount = void 0;

  Playlist.find({ where: { name: "Collection", UserId: userId } }).then(function (result) {
    playlist = result;
    return client.user().collection().getReleases('jtregoat', 0, { page: 1, per_page: 250 });
  }).then(function (collection) {
    pageCount = collection.pagination.pages;
    for (var i = 1; i <= pageCount; i++) {
      client.user().collection().getReleases("jtregoat", 0, { page: i, per_page: 250 }).then(function (info) {
        info.releases.forEach(function (release) {
          Release.findOrCreate({ where: { title: release.basic_information.title, catno: release.basic_information.labels[0].catno, discogs_id: release.basic_information.id, year: release.basic_information.year } }).spread(function (info, created) {
            return console.log(created);
          });
          release.basic_information.artists.forEach(function (artist) {
            return Artist.findOrCreate({ where: { name: artist.name, discogs_id: artist.id } }).spread(function (info, created) {
              return console.log(created);
            });
          });
          release.basic_information.labels.forEach(function (label) {
            return Label.findOrCreate({ where: { name: label.name, discogs_id: label.id } }).spread(function (info, created) {
              return console.log(created);
            });
          });
        });
      });
    }
  });
}

exports.default = discogsWorker;