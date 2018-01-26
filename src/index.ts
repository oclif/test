import {expect, fancy, FancyTypes, NockScope} from 'fancy-test'

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
  expect,

  FancyTypes,
  NockScope,
  Options,
}
