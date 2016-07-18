import nconf from '../server/nconf'
import Koa from 'koa'
import Router from 'koa-router'
import Pug from 'koa-pug'
import convert from 'koa-convert'
import { db } from './model'
import { status } from './status'
import { logger } from '../common/debug'

const log = logger('app')
const app = new Koa()
app.name = 'zappr-status'

// Trust proxy header fields.
app.proxy = true

// Static pages
const pug = new Pug({
  viewPath: './status-page/views'
})

/**
 * Initialize the Koa application instance.
 *
 * @returns {Application} Koa application
 */
export function init() {
  const router = status(Router())
  return app
  .use(convert(pug.middleware))
  .use(router.routes())
  .use(router.allowedMethods())
}

/**
 * Run setup processes and start listening.
 *
 * @param {number} port Port to listen on
 */
async function start(port = nconf.get('APP_PORT')) {
  // sync models
  await db.sync()
  init().listen(port)
  log(`listening on port ${port}`)
}

if (require.main === module) {
  start()
  .catch(err => {
    log(err)
    process.exit(1)
  })
}
