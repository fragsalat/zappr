import MetricsCreator from '../metrics/MetricsServiceCreator'
import { Message } from '../model'
import marked from 'marked'

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

export default function status(router) {
  return router.get('/status', async function (ctx) {
    const metricsData = await metrics.getMetrics()
    const showAllMessages = ctx.query.all === 'true'
    const where = showAllMessages ? {} : {
      valid_from: {
        $or: {
          $lte: new Date(),
          $eq: null
        }
      },
      valid_until: {
        $or: {
          $gte: new Date(),
          $eq: null
        }
      }
    }
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
      where
    })
    ctx.render('status', {
      text: 'hello world',
      metrics_debug: JSON.stringify(metricsData),
      metrics: metricsData,
      showAllMessages,
      messages: messages.map(msg => ({...msg.get({plain: true}), rendered: marked(msg.message)}))
    }, true)
  })
}
