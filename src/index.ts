import base, {expect, Test, TestBase} from 'fancy-mocha'

import command from './command'
import exit from './exit'
import hook from './hook'

import {Options} from './options'

export const test = base
.extend('command', command)
.extend('exit', exit)
.extend('hook', hook)

export default test

export {
  expect,
  exit,
  Test,
  TestBase,
  Options,
}
