export default class MetricsProvider {
  constructor(config = {}) {
    this.config = config
  }

  async getMetrics() {
    // implement in subclasses
    return {
      metrics: ['foo', 'bar'],
      timeframes: ['-1h', '-1d', '-1w'],
      detailed: {
        '-1h': {
          foo: [[Date.now(), 9]]
        }
      },
      accumulated: {
        '-1h': {
          foo: 10,
          bar: 50
        },
        '-1d': {
          foo: 11,
          bar: 45
        },
        '-1w': {
          foo: 10.5,
          bar: 47.5
        }
      }
    }
  }
}
