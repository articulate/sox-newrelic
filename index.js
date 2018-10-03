const { curry, partial } = require('ramda')

const instrument = (newrelic, handler) => {
  const start = newrelic.startWebTransaction.bind(newrelic)

  const instrumented = axn =>
    start(axn.type, partial(handler, [ axn ]))

  return instrumented
}

module.exports = curry(instrument)
