const { Playlist, Artist, Label, Release} = require('../../models/index.js')


function discogsWorker(client, userId){
  let playlist;
  let pageCount;

  Playlist.find({where: {name: "Collection", UserId: userId}}).then(result => {
    playlist = result
    return client.user().collection().getReleases('jtregoat', 0, {page: 1, per_page: 250})
  })
  .then(collection => {
    pageCount = collection.pagination.pages
    for(let i=1; i <= pageCount; i++){
      client.user().collection().getReleases("jtregoat", 0, {page: i, per_page: 250})
      .then(info => {
        info.releases.forEach(release => {
          Release.findOrCreate({where: {title: release.basic_information.title, catno: release.basic_information.labels[0].catno, discogs_id: release.basic_information.id, year: release.basic_information.year}}).spread((info, created) => console.log(created))
          release.basic_information.artists.forEach(artist => Artist.findOrCreate({where: {name: artist.name, discogs_id: artist.id}}).spread((info, created) => console.log(created)))
          release.basic_information.labels.forEach(label => Label.findOrCreate({where: {name: label.name, discogs_id: label.id}}).spread((info, created) => console.log(created)))
        })
      })
    }
  })
}

export default discogsWorker
