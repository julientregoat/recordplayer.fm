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
  .then(result => res.json({result: result}))
  .catch(error => res.json({error: error}))

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
