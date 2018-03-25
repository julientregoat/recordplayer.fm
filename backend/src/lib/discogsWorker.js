const db = require('../../models/index.js')


db.Playlist.findAll().then(console.log)
// function discogsWorker(client){
//   console.log(client)
//   client.user().collection().getReleases("jtregoat", 0, {page: 0, per_page: 100}, function (err, data){
//     console.log("collection", err, data)
//   })
// }
//
// export default discogsWorker
