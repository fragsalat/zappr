/**
 * Status page
 */

// TODO write MetricsProvider interface that gets metrics in defined format, async
// TODO write TestMetricsProvider and  ZMONMetricsProvider
// TODO include metrics here, with charts

// TODO extend db to hold status messages. { type, message, valid_from, valid_until, author }
// TODO extend api to manage status messages, but make it only accessible to configured admins
// TODO fetch status messages and display them

export function status(router) {
  return router.get('/status', function (ctx) {

    ctx.render('status', {
      text: 'hello world'
    }, true)
  })
}
