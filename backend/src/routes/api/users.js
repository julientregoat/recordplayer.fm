import Express from 'express'
import { User } from '../../models'
const users = Express.Router()

users.route('/')
.get((req, res) => {
  res.json({message: "api/users"})
})
.post((req, res) => {
  console.log(req.body)
  // man validations I guess
  User.find({where: {username: 'jtregoat'}})
  .then(console.log)
  User.build({username: 'jtregoat'})
  .save().then(() => console.log('transaction complete'))
  .catch(err => console.log('error', err))
  // .then(result => res.json(result))
  // test
})


users.route('/session')
.post((req, res) => {
  res.json({message: 'login'})
})
.delete((req, res) => {
  res.json({message: 'logout'})
})

export default users
