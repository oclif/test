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
  mock?: [any, string, any][]
  env?: {[k: string]: string}
}

export interface Settings<T, U> {
  (description: string, cb: (this: T) => void): U
  stdout: Settings<T, U>
  stderr: Settings<T, U>
  only: Settings<T, U>
  skip: Settings<T, U>
  print: Settings<T, U>
  mock(object: any, path: string, value: any): Settings<T, U>
  env(env?: {[k: string]: string}): Settings<T, U>
}

export type Describe = Settings<mocha.ISuiteCallbackContext, mocha.ISuite>
export type It = Settings<mocha.ITestCallbackContext, mocha.ITest>

const env = process.env

function hooks(options: Options) {
  const mocks = (options.mock || []).map(m => [...m, _.get(m[0], m[1])])
  return {
    before() {
      mocks.forEach(([object, path, value]) => _.set(object, path, value))
      if (options.env) process.env = options.env
      if (options.stdout || options.stderr) {
        stdMocks.use({stdout: !!options.stdout, stderr: !!options.stderr, print: !!options.print})
      }
    },
    after() {
      mocks.forEach(([object, path, , original]) => _.set(object, path, original))
      process.env = env
      stdMocks.restore()
    },
  }
}

const settings = (builder: any, opts: Options) => {
  const prop = (name: string, value: any): PropertyDescriptor => {
    const prop: PropertyDescriptor = {enumerable: true}
    if (typeof value === 'function') {
      prop.value = (...args: any[]) => builder({...opts, [name]: value(...args)})
    } else {
      prop.get = () => builder({...opts, [name]: value})
    }
    return prop
  }
  const mock = opts.mock = opts.mock || []

  return {
    print: prop('print', true),
    stdout: prop('stdout', true),
    stderr: prop('stderr', true),
    only: prop('only', true),
    skip: prop('skip', true),
    env: prop('env', (env: {[k: string]: string} = {}) => env),
    mock: prop('mock', (object: any, path: string, value: any) => mock.concat([[object, path, value]])),
  }
}

const __describe = (options: Options = {}): Describe => {
  return Object.defineProperties((description: string, cb: (this: mocha.ISuiteCallbackContext) => void) => {
    return ((options.only && describe.only) || (options.skip && describe.skip) || describe)(
      description,
      function (this: mocha.ISuiteCallbackContext) {
        let {before, after} = hooks(options)
        beforeEach(before)
        afterEach(after)
        cb.call(this)
      })
  }, settings(__describe, options))
}

const __it = (options: Options = {}): It => {
  return Object.defineProperties((expectation: string, cb: (this: mocha.ITestCallbackContext) => void) => {
    return ((options.only && it.only) || (options.skip && it.skip) || it)(
      expectation,
      async function (this: mocha.ITestCallbackContext) {
        let {before, after} = hooks(options)
        before()
        await cb.call(this)
        after()
      })
  }, settings(__it, options))
}

const _describe = __describe()
const _it = __it()

export {
  _describe as describe,
  _it as it,
}
