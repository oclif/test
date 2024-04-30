import * as fancyTest from 'fancy-test'
import {dirname} from 'node:path'

import {command} from './command'
import exit from './exit'
import hook from './hook'
import {loadConfig} from './load-config'

function traverseFilePathUntil(filename: string, predicate: (filename: string) => boolean): string {
  let current = filename
  while (!predicate(current)) {
    current = dirname(current)
  }

  return current
}

/* eslint-disable unicorn/prefer-module */
loadConfig.root =
  process.env.OCLIF_TEST_ROOT ??
  Object.values(require.cache).find((m) => m?.children.includes(module))?.filename ??
  traverseFilePathUntil(
    require.main?.path ?? module.path,
    (p) => !(p.includes('node_modules') || p.includes('.pnpm') || p.includes('.yarn')),
  )
/* eslint-enable unicorn/prefer-module */

// Using a named export to import fancy causes this issue: https://github.com/oclif/test/issues/516
export const test = fancyTest.fancy
  .register('loadConfig', loadConfig)
  .register('command', command)
  .register('exit', exit)
  .register('hook', hook)
  .env({NODE_ENV: 'test'})

export default test

export {command} from './command'

export {Config} from '@oclif/core'
export {FancyTypes, expect} from 'fancy-test'
