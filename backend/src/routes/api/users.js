import Express from 'express'
import { User, Playlist, Release, Video } from '../../../models'

const DiscogsClient = require('disconnect').Client
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../env'

const users = Express.Router()
const bcrypt = require('bcrypt')

users.route('/')
.get((req, res) => {
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

users.route('/:id')
.get((req, res) => {
  let id = req.params.id;
  User.findById(id)
  .then(user => res.json(user))
})

users.route('/:id/collection')
.get((req, res) => {
  let id = req.params.id;
  User.findById(id)
  .then(user => user.getPlaylists({where: {name: 'Collection'}}))
  .then(playlists => playlists[0].getTracks({include: [{model: Video}, {model: Release}]}))
  .then(tracks => res.json({tracks: tracks}))
})

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

export default users
