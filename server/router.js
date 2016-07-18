// Routing
import Router from 'koa-router'
import { health } from './routes/health'
import { authorize, login, logout } from './routes/auth.js'
import { env, repos, repo } from './routes/api'

const routes = [health, authorize, login, logout, env, repos, repo]
export default routes.reduce((router, route) => route(router), Router())

