import Express from 'express'
const api = Express.Router()
import users from './api/users'

api.use('/users', users)

api.get('/', (req, res) => {
  res.json({error: 'invalid location'})
})

export default api
