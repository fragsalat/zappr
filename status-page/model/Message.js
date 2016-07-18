import { db } from './Database'
import Sequelize from 'sequelize'

export default db.define('message', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  type: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  author_username: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  author_id: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  valid_from: {
    type: Sequelize.DATE
  },
  valid_until: {
    type: Sequelize.DATE
  }
}, {
  schema: db.schema
})
