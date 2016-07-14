import nconf from '../nconf'
import StubMetrics from './metrics/MetricsService'
import ZMON from './metrics/ZMONService'
import { logger } from '../../common/debug'

const warn = logger('metrics', 'warn')
const info = logger('metrics', 'info')
const log = logger('metrics')

const provider = nconf.get('METRICS_PROVIDER')
info(`using metrics provider ${provider}`)

export default function create(){
  switch (provider) {
    case 'zmon':
      return new ZMON()
    default:
      warn('metrics disabled')
      return new StubMetrics()
  }
}
