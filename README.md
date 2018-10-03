# @articulate/sox-newrelic
[![@articulate/sox-newrelic](https://img.shields.io/npm/v/@articulate/sox-newrelic.svg)](https://www.npmjs.com/package/@articulate/sox-newrelic)
[![Build Status](https://travis-ci.org/articulate/sox-newrelic.svg?branch=master)](https://travis-ci.org/articulate/sox-newrelic)
[![Coverage Status](https://coveralls.io/repos/github/articulate/sox-newrelic/badge.svg?branch=master)](https://coveralls.io/github/articulate/sox-newrelic?branch=master)

NewRelic integration for [`@articulate/sox`](https://github.com/articulate/sox).

## Usage

```haskell
instrument :: NewRelic -> (Action -> Promise Action) -> Action -> Promise Action
```

Wraps a top-level action handler to instrument for NewRelic.

```js
const instrument = require('@articulate/sox-newrelic')
const io = require('socket.io')
const { mount } = require('@articulate/sox')
const newrelic = require('newrelic')
const { tap } = require('ramda')

const handler = require('./handler')

const app =
  instrument(newrelic, handler)

const sockets = server =>
  io(server).use(mount({ app }))

module.exports = tap(server)
```

If your handlers are split into modules, `instrument` is curried to make the following possible:

```js
const { compose, mergeAll, tap, values } = require('ramda')
const instrument = require('@articulate/sox-newrelic')
const { handle, mount } = require('@articulate/sox')
const io = require('socket.io')
const newrelic = require('newrelic')

const handlers = require('require-dir')()

const app =
  compose(instrument(newrelic), handle, mergeAll, values)(handlers)

const sockets = server =>
  io(server).use(mount({ app }))

module.exports = tap(server)
```
