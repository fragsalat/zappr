import nconf from './nconf'
import Koa from 'koa'
import Router from 'koa-router'
import Pug from 'koa-pug'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import passport from 'koa-passport'
import GithubStrategy from '../server/passport/passport-github-api'
import { db } from './model'
import status from './routes/status'
import health from './routes/health'
import messages from './routes/messages'
import { logger } from '../common/debug'

const log = logger('app', 'info')
const app = new Koa()
app.name = 'zappr-status'

// Trust proxy header fields.
app.proxy = true

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.use(new GithubStrategy({
    apiUrl: nconf.get('GITHUB_API_URL')
  },
  (accessToken, profile, done) =>
    done(null, profile)
))

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
  const router = [status, messages, health].reduce((router, route) => route(router), Router())
  return app
  .use(bodyParser())
  .use(passport.initialize())
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
