import { Sequelize, sequelize } from '../sequelize'
import User from './User'

// forcing DB to recreate tables
sequelize.sync({force: true})

export { User }
