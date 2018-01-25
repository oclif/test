import {Base, CatchOptions, EnvOptions, expect, fancy, NockScope, StdmockOptions} from 'fancy-mocha'

import command from './command'
import exit from './exit'
import hook from './hook'

import {Options} from './options'

export const test = fancy
.register('command', command)
.register('exit', exit)
.register('hook', hook)

export default test

export {
  Base,
  CatchOptions,
  EnvOptions,
  NockScope,
  Options,
  StdmockOptions,
  expect,
}
