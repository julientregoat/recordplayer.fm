const { Playlist, Artist, Label, Release} = require('../../models/index.js')

// gonna need to refactor this behemoth

function trackParser(client, releaseDiscogsId){
  console.log(releaseDiscogsId)
  client.database().getRelease(releaseDiscogsId).then(console.log)
}

function discogsWorker(client, userId){
  let playlist;
  let pageCount;
  let userReleaseIds;
  let timeout = 8000

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
          Release.findOrCreate({where: {
            title: release.basic_information.title,
            catno: release.basic_information.labels[0].catno,
            discogs_id: release.basic_information.id,
            year: release.basic_information.year}})
          .spread((releaseInst, created) => {

            // finding or creating each artist per release and associating release to it (many to many)
            release.basic_information.artists.forEach(artist => Artist.findOrCreate({where: {name: artist.name, discogs_id: artist.id}})
            .spread((artistInst, created) => artistInst.addRelease(releaseInst)))

            // finding or creating each label per release and associating the release to it (belongs to)
            release.basic_information.labels.forEach(label => Label.findOrCreate({where: {name: label.name, discogs_id: label.id}})
            .spread((labelInst, created) => labelInst.addRelease(releaseInst)))
            setTimeout(() => trackParser(client, releaseInst.discogs_id), timeout+=2000)

          })
        })
      })
    }
  })
}

export default discogsWorker
