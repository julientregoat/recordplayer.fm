import { Sequelize, sequelize }  from '../sequelize'

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password_digest: {
    type: Sequelize.STRING
  },
  discogs_username: {
    type: Sequelize.STRING
  },
  authenticated: {
    type: Sequelize.BOOLEAN
  },
  oauth_token: {
    type: Sequelize.STRING
  },
  oauth_token_secret: {
    type: Sequelize.STRING
  }
});

User.sync()
.then(console.log)

export { User }
