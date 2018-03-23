import Express from 'express'
import { User } from '../../models'
const users = Express.Router()

users.route('/')
.get((req, res) => {
  res.json({message: "api/users"})
})
.post((req, res) => {
  User.create({username: 'jtregoat'})
  .then(result => res.json(result))
  // User.findAll().then(result => res.json(result))
})


users.route('/session')
.post((req, res) => {
  res.json({message: 'login'})
})
.delete((req, res) => {
  res.json({message: 'logout'})
})

export default users
