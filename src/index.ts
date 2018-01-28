// tslint:disable no-var-before-return
import {IConfig} from '@dxcli/config'
import {expect, fancy, FancyTypes, NockScope} from 'fancy-test'

import command from './command'
import exit from './exit'
import hook from './hook'
import loadConfig from './load_config'

export const test = fancy
.register('loadConfig', loadConfig)
.register('command', command)
.register('exit', exit)
.register('hook', hook)

export default test

export {
  expect,

  FancyTypes,
  NockScope,
  IConfig,
}
