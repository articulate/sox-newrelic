const { curry, partial } = require('ramda')

// instrument :: NewRelic -> (Action -> Promise Action) -> Action -> Promise Action
const instrument = (newrelic, handler) => {
  const start = newrelic.startWebTransaction.bind(newrelic)

  const instrumented = axn =>
    start(axn.type, partial(handler, [ axn ]))

  return instrumented
}

module.exports = curry(instrument)
