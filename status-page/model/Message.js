import { db } from './Database'
import Sequelize from 'sequelize'

//  { type, message, valid_from, valid_until, author }
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
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  author: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  valid_from: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  valid_until: {
    type: Sequelize.DATE
  }
}, {
  schema: db.schema
})
