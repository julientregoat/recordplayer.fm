import Express from 'express'
import { User } from '../../../models'

const users = Express.Router()
const bcrypt = require('bcrypt')

users.route('/')
.get((req, res) => {
  User.findAll().
  then(result => res.json(result))
})
.post((req, res) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    return User.create({username: req.body.username, email: req.body.email, password_digest: hash})
  })
  .then(result => console.log("result", result))
  .catch(error => res.json({error: error}))

  res.json({hmm: "testing"})
})


users.route('/session')
.post((req, res) => {
  User.find({where: {username: req.body.username}})
  .then(user => bcrypt.compare(req.body.password, user.password_digest))
  .then(result => res.json({loginInfo: result}))
  .catch(err => res.json({error: "User does not exist or password doesn't match."}))
})

export default users
