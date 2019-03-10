import Express from 'express'
const api = Express.Router()

import users from './api/users'
import playlists from './api/playlists'

api.get('/', (req, res) => {
	// add a 404 status here
  	res.json({error: 'invalid endpoint'})
})

api.use('/users', users)

api.use('/playlists', playlists)

export default api
