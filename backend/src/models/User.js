import { Sequelize, sequelize }  from '../sequelize'

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
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
}, {
  validate: {
    isUnique(){
      User.find({ where: {username: this.username} })
      .then(result => {
        if (result){
          throw new Error ('username must be unique')
        }
      })
    }
  }
})

export default User
