// tslint:disable no-var-before-return
import {IConfig, IEngine} from '@anycli/config'
import {expect, fancy, FancyTypes, NockScope} from 'fancy-test'

import command from './command'
import exit from './exit'
import hook from './hook'
import loadConfig from './load_config'
import loadEngine from './load_engine'

loadConfig.root = module.parent!.filename

export const test = fancy
.register('loadConfig', loadConfig)
.register('loadEngine', loadEngine)
.register('command', command)
.register('exit', exit)
.register('hook', hook)

export default test

export {
  expect,

  IEngine,
  FancyTypes,
  NockScope,
  IConfig,
}
