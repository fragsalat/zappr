export default function health(router) {
  return router.get('/health', ctx => {
    ctx.body = '"OK"'
  })
}
