const { Playlist, Artist, Label, Release, Track, Video } = require('../../models/index.js')

// gonna need to refactor this behemoth

function strftSeconds(seconds){
  let minutes = parseInt(seconds)/60
  let remainingSeconds = parseInt(seconds)%60
  return minutes + ":" + remainingSeconds
}

function trackParser(client, releaseInst, userCollection){
  console.log(releaseInst.discogs_id)
  client.database().getRelease(releaseInst.discogs_id)
  .then(release => {
    release.tracklist.forEach(track => {
      // if there's no matching release, just use the first one
      let video = release.videos.find(video => video.title.includes(track.title)) || release.videos[0]
      Promise.all([
        Video.findOrCreate({where: {title: video.title, duration: strftSeconds(video.duration), youtube_id: video.uri.split('v=')[1]}}),
        Track.findOrCreate({where: {title: track.title, position: track.position}})
      ])
      .then(results => {
        // packaged in an array of arrays of the objs you wanted
        let video = results[0][0]
        let track = results[1][0]

        video.addTrack(track)
        releaseInst.addTrack(track)
        userCollection.addTrack(track)
      })
    })
  })
}

function discogsWorker(client, userId){
  let playlist;
  let pageCount;
  let userReleaseIds;
  let timeout = 5000

  // finding the user's main 'collection playlist to fill with tracks'
  Playlist.findOrCreate({where: {name: "Collection", UserId: userId}}).then(result => {
    playlist = result[0]
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

            // not sure about this timing situation
            timeout >= 60000 ? timeout = 5000 : null
            setTimeout(() => trackParser(client, releaseInst, playlist), timeout+=2500)

          })
        })
      })
    }
  })
}

export default discogsWorker
