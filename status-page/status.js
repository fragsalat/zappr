import MetricsCreator from './metrics/MetricsServiceCreator'

// TODO write MetricsProvider interface that gets metrics in defined format, async
// TODO write TestMetricsProvider and  ZMONMetricsProvider
// TODO include metrics here, with charts

// TODO extend db to hold status messages. { type, message, valid_from, valid_until, author }
// TODO extend api to manage status messages, but make it only accessible to configured admins
// TODO fetch status messages and display them

/**
 * Status page
 */

const metrics = MetricsCreator()

export function status(router) {
  return router.get('/status', async function (ctx) {
    const metricsData = await metrics.getMetrics()
    ctx.render('status', {
      text: 'hello world',
      metrics_debug: JSON.stringify(metricsData),
      metrics: metricsData,
      messages: [{
        title: 'Test maintenance',
        body: 'test message',
        type: 'warning'
      }, {
        title: 'Outage is over',
        body: 'Phew',
        type: 'success'
      }, {
        title: 'Partial outage',
        body: 'Github is to blame!',
        type: 'danger'
      }]
    }, true)
  })
}
