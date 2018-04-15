import Express from 'express'
import { User, Playlist, Release, Video, Sequelize, Artist, Track } from '../../../models'

const DiscogsClient = require('disconnect').Client
const playlists = Express.Router()
const bcrypt = require('bcrypt')


// need to implement JWT for access to this info, make sure a user has access to only THEIR playlists
// should handle creation of playlists here to be RESTful biatch
playlists.route('/')
.get((req, res) => res.json({message: 'playlists api endpoint. maybe should view most recent public playlists here'}))
.post((req, res) => {
	console.log('new playlist: ', req.body)
	res.json({message: "new playlist creation"})
})

// def will need auth here
// will need to be able to patch and delete these
playlists.route('/:playlist_id')
.get((req, res) => {
  Playlist.findById(req.params.playlist_id, {
  	include:[
  		{model: User, attributes: ['id', 'username']}, 
  		{model: Track}
  		],
  	attributes: ['id', 'name', 'UserId']})
  .then(playlist => res.json(playlist))
})

export default playlists