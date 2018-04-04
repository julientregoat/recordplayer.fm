import Express from 'express'
import { User, Playlist, Release, Video, Sequelize, Artist, Track } from '../../../models'

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../../env.js'

const users = Express.Router()
const bcrypt = require('bcrypt')


// need to implement JWT for access to this info


// user creation

users.route('/')
.get((req, res) => {
  // what do I do with this get part?
  // User.findById(1)
  // .then(user => user.getPlaylists({where: {name: "Collection"}}))
  // .then(playlists => playlists[0].getTracks())
  // .then(console.log)
  res.json({message: "working"})
})
.post((req, res) => {

  // hashing password for security
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    // creating default playlist 'collection' for the user
    return Promise.all([
      User.create({username: req.body.username, email: req.body.email, password_digest: hash}), Playlist.create({name: "Collection"})
    ])
  })
  .then(result => {
    res.json({user: result[0]})
    return result[0].addPlaylist(result[1])
  })
  .then(console.log)
  .catch(error => res.json({error: error}))

})

// should session be moved to a different part of the API? user login stuff here

users.route('/session')
.post((req, res) => {
  let selectedUser;
  User.find({where: {username: req.body.username}})
  .then(user => {
    selectedUser = user
    return bcrypt.compare(req.body.password, user.password_digest)
  })
  .then(result => {
    if (result){
      res.json({user: selectedUser})
    } else {
      res.json({error: "User not found or password is incorerct."})
    }
  })
  .catch(error => res.json({error: "User not found or password is incorerct."}))
})


users.route('/:id')
.get((req, res) => {
  let id = req.params.id;
  User.findById(id)
  .then(user => res.json(user))
})

// get main collection

users.route('/:id/collection')
.get((req, res) => {
  let id = req.params.id;
  // defaults if there is no query added
  let page = req.query.page || 0
  let size = req.query.size || 100
  let range = [size*page, size*page + 100]
  let totalPages;
  User.findById(id)
  // maybe can use 'include' here to just grab the tracks
   .then(user => user.getPlaylists({where: {name: 'Collection'}}))
  .then(playlists => {
    return Promise.all([
  // this can probably refactored into more of a 'find the collection playlist, and count the number of tracks within that'
  // especially since I'm already getting all tracks with 'playlists[0].getTracks', that can just be .count()-ed.
      Track.findAndCountAll({
        include: [{
          model: Playlist,
          where: {
            name: "Collection",
            UserId: id
          }
        }]
      }),
      playlists[0].getTracks({
        // refactor this to use build in Sequelize pagination queries
        where: {
          id: {[Sequelize.Op.between]: range}
        },
        include: [
          {model: Video},
          {model: Release, include: {model: Artist}}
        ]
      })
    ])
  })
  .then(results => {
    console.log(results)
    res.json({
      totalPages: Math.ceil(results[0].count/size),
      tracks: results[1]
    })
  })
})

users.route('/:id/playlists')
.get((req, res) => {
  console.log(req.params, req.query)
  User.findById(req.params.id)
  .then(user => user.getPlaylists())
  .then(playlists => {
    res.send(playlists)
  })
})
.post((req, res) => {
  console.log(req.body)
  res.json({message: 'creating new playlist'})
})


export default users
