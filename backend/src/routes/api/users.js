import Express from 'express'
import { User } from '../../models'
const users = Express.Router()

users.route('/')
.get((req, res) => {
  User.findAll().
  then(result => res.json(result))
})
.post((req, res) => {
  console.log(req.body)
  // manual validations I guess
  // User.find({where: {username: 'jtregoat'}})
  // .then(result => {
  //   if (result){
  //     return res.json({error: "username already exists"})
  //   }
  // })
  User.build({username: 'jtregoat'})
  .save()
  .then((poop) => console.log('transaction complete', poop))
  .catch((err) => console.log('error', err))
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
