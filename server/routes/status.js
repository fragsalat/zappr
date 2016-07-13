/**
 * Status page
 */
import { RequestDuration, RequestRate } from '../middleware/prometheus'

export function status(router) {
  return router.get('/status', function (ctx) {
    const requestRates = RequestRate.get()
                                    .values
                                    .map(p => [`${p.labels.method} ${p.labels.path}`, p.value])
                                    .sort((a, b) => a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0)
    const requestDurations = RequestDuration.get()
                                            .values
                                            .map(p => [`${p.labels.method} ${p.labels.path}`, p.labels.quantile, p.value])
                                            .filter(rate => rate[1] >= 0.9)
                                            .sort((a, b) => a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0)


    ctx.render('status', {
      request_rates: JSON.stringify(requestRates),
      request_durations: JSON.stringify(requestDurations)
    }, true)
  })
}
