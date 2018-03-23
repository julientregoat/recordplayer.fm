import { Sequelize, sequelize }  from '../sequelize'

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isUnique: (value) => {
        User.find({ where: {username: value} })
        .then(console.log)
      }
    }
  },
  email: {
    type: Sequelize.STRING
  },
  password_digest: {
    type: Sequelize.STRING
  },
  authenticated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  discogs_username: {
    type: Sequelize.STRING
  },
  oauth_token: {
    type: Sequelize.STRING
  },
  oauth_token_secret: {
    type: Sequelize.STRING
  }
});

export default User
