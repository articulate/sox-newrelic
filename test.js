const { evolve, toUpper } = require('ramda')
const { expect } = require('chai')
const property = require('prop-factory')
const spy = require('@articulate/spy')

describe('@articulate/sox-newrelic', () => {
  const axn = { type: 'TYPE', payload: 'payload' }
  const handled = spy()
  const res = property()
  const start = spy()

  const FakeRelic = {
    startWebTransaction(url, handler) {
      start(url, handler)
      return handler()
    }
  }

  const handler = axn => {
    handled(axn)
    return Promise.resolve(axn)
      .then(evolve({ payload: toUpper }))
  }

  const app = require('.')(FakeRelic, handler)

  afterEach(() => {
    handled.reset()
    start.reset()
  })

  beforeEach(() =>
    app(axn).then(res)
  )

  it('starts the transaction with the action type', () => {
    expect(start.calls.length).to.equal(1)
    expect(start.calls[0][0]).to.equal('TYPE')
    expect(start.calls[0][1]).to.be.a('Function')
  })

  it('executes the handler', () => {
    expect(handled.calls.length).to.equal(1)
    expect(handled.calls[0]).to.eql([ axn ])
  })

  it('returns the result of the handler', () =>
    expect(res()).to.eql({ type: 'TYPE', payload: 'PAYLOAD' })
  )
})
