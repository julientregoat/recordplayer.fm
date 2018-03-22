const Sequelize = require('sequelize');
const sequelize = new Sequelize('recordplayer', 'nodedb', 'nodedb', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// practice

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({force: true})
.then(() => User.create({
  firstName: 'John',
  lastName: 'Hancock'
}))
.then(() => User.findAll())
.then(users => console.log(users))
.catch(console.log)
