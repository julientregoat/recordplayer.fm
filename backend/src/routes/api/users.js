import Express from 'express'

const users = Express.Router()

users.get('/', (req, res) => {
  res.json({message: "api/users"})
})

export default users
