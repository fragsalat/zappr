// Routing
import Router from 'koa-router'
import { health } from './routes/health'
import { authorize, login, logout } from './routes/auth.js'
import { env, repos, repo } from './routes/api'
import { status } from './routes/status'

export default [health, authorize, status, login, logout, env, repos, repo].reduce((router, route) => route(router), Router())

