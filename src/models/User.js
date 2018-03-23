import { Sequelize, sequelize }  from '../sequelize'

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync()
.then(console.log)

export { User }
