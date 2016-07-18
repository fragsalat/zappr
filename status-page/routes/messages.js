import passport from 'koa-passport'
import nconf from '../nconf'
import { Message } from '../model'

const ADMIN_USERS = nconf.get('ADMIN_USERS')

async function verifyAdmin(ctx, next) {
  const user = ctx.req.user.username
  if (ADMIN_USERS.indexOf(user) !== -1) {
    await next()
  } else {
    ctx.throw(401)
  }
}

export async function getMessages(ctx) {
  ctx.body = await Message.findAll()
}

export async function postMessage(ctx) {
  const message = ctx.request.body
  message.author_username = ctx.req.user.username
  message.author_id = ctx.req.user.id
  try {
    ctx.body = await Message.create(message)
  } catch (e) {
    console.log(e)
    ctx.response.status = 500
  }
}

export async function putMessage(ctx) {
  const id = parseInt(ctx.params.id, 10)
  const newMessage = ctx.request.body
  newMessage.author = ctx.req.user.username
  newMessage.author_id = ctx.req.user.id
  const oldMessage = await Message.findById(id)
  if (!oldMessage) {
    ctx.throw(404)
    return
  }
  await oldMessage.update(newMessage)
  ctx.body = await Message.findById(id)
}

export async function getMessage(ctx) {
  const id = parseInt(ctx.params.id, 10)
  const message = await Message.findById(id)
  if (!message) {
    ctx.throw(404)
    return
  }
  ctx.body = message
}

export async function deleteMessage(ctx) {
  const id = parseInt(ctx.params.id, 10)
  const message = await Message.findById(id)
  if (!message) {
    ctx.throw(404)
    return
  }
  message.destroy()
  Message.sync()
  ctx.response.status = 200
}

export default function messages(router) {
  return router.get('/messages', getMessages)
               .get('/messages/:id', getMessage)
               .put('/messages/:id', passport.authenticate('github-api'), verifyAdmin, putMessage)
               .post('/messages', passport.authenticate('github-api'), verifyAdmin, postMessage)
               .delete('/messages/:id', passport.authenticate('github-api'), verifyAdmin, deleteMessage)
}
