// tslint:disable no-namespace

import * as _ from 'lodash'
import * as mocha from 'mocha'
import stripAnsi = require('strip-ansi')
export {expect} from 'chai'

const stdMocks = require('std-mocks')

function bufToString(b: Buffer): string {
  return b.toString('utf8')
}

export const output = {
  get stdout() {
    return stdMocks
      .flush({stderr: false})
      .stdout
      .map(bufToString)
      .map(stripAnsi)
      .join('')
  },
  get stderr() {
    return stdMocks
      .flush({stdout: false})
      .stderr
      .map(bufToString)
      .map(stripAnsi)
      .join('')
  },
}

interface Options {
  stdout?: boolean
  stderr?: boolean
  only?: boolean
  skip?: boolean
  print?: boolean
  env?: {[k: string]: string}
}

export interface Describe {
  (description: string, cb: (this: mocha.ISuiteCallbackContext) => void): mocha.ISuite
  stdout: Describe
  stderr: Describe
  only: Describe
  skip: Describe
  print: Describe
  env(env?: {[k: string]: string}): Describe
}

const env = process.env

const __describe = (options: Options = {}): Describe => {
  _.defaults(options, {
    stdout: false,
    stderr: false,
    print: false,
    only: false,
    skip: false,
  })

  return Object.defineProperties((description: string, cb: (this: mocha.ISuiteCallbackContext) => void) => {
    let thisSuite: any = describe
    if (options.only) thisSuite = describe.only
    if (options.skip) thisSuite = describe.skip

    return thisSuite(description, function (this: mocha.ISuiteCallbackContext) {
      if (options.env) {
        beforeEach(() => {
          process.env = {}
        })
      }

      // always reset process.env no matter what
      afterEach(() => {
        process.env = env
      })

      if (options.stdout || options.stderr) {
        beforeEach(() => {
          stdMocks.use(options)
        })
        afterEach(() => {
          stdMocks.restore()
        })
      }
      cb.call(this)
    })
  }, {
    print: {
      enumerable: true,
      get: () => __describe({...options, print: true})
    },
    stdout: {
      enumerable: true,
      get: () => __describe({...options, stdout: true})
    },
    stderr: {
      enumerable: true,
      get: () => __describe({...options, stderr: true})
    },
    only: {
      enumerable: true,
      get: () => __describe({...options, only: true})
    },
    skip: {
      enumerable: true,
      get: () => __describe({...options, skip: true})
    },
    env: {
      enumerable: true,
      value: (env: {[k: string]: string} = {}) => __describe({...options, env})
    },
  })
}

const _describe = __describe()

export {_describe as describe}
