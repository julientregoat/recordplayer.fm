"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function discogsWorker(client) {
  console.log(client);
  client.user().collection().getReleases("jtregoat", 0, { page: 0, per_page: 100 }, function (err, data) {
    console.log("collection", err, data);
  });
}

exports.default = discogsWorker;