import Sequelize from 'sequelize'
import nconf from '../../server/nconf'
import { logger } from '../../common/debug'

import { Message } from './'

const log = logger('model')
const error = logger('model', 'error')


function getParameters(driver = nconf.get('DB_DRIVER')) {
  const options = {
    logging: log,
    typeValidation: true
  }
  switch (driver) {
    case 'sqlite':
      return [
        nconf.get('DB_NAME'),
        null,
        null,
        {
          dialect: driver,
          storage: nconf.get('SQLITE_FILE'),
          ...options
        }
      ]
    case 'postgres':
      return [
        nconf.get('DB_NAME'),
        nconf.get('DB_USER'),
        nconf.get('DB_PASS'),
        {
          dialect: driver,
          host: nconf.get('DB_HOST'),
          port: nconf.get('DB_PORT'),
          ...options
        }
      ]
    default:
      throw new Error(`unsupported database driver ${driver}`)
  }
}

class Database extends Sequelize {
  constructor(...args) {
    super(...args)
  }

  /**
   * @returns {String}
   */
  get schema() {
    return nconf.get('DB_SCHEMA')
  }

  /**
   * Create the database schema and sync all models.
   *
   * @returns {Promise}
   */
  async sync() {
    const schemas = await db.showAllSchemas()

    if (schemas.indexOf(this.schema) === -1) {
      const result = await db.createSchema(this.schema)
      log('created schema' + result)
    }

    try {
      await Message.sync()
      log('synced models')
    } catch (e) {
      error(e)
    }
  }
}

export const db = new Database(...getParameters())
