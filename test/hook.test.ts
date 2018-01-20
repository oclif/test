import * as path from 'path'

import {describe, expect, testHook} from '../src'

describe('hooks', () => {
  const stdout = `test/0.0.0 (${process.platform}-${process.arch}) node-${process.version}\n`
  testHook('init', {id: '-v'}, {stdout, exit: 0, root: path.join(__dirname, 'fixtures/multi')})
  testHook('init', {id: '--version'}, {stdout, exit: 0, root: path.join(__dirname, 'fixtures/multi')})
  testHook('init')
  testHook('init', {id: '--version'}, {stdout: true, exit: 0, root: path.join(__dirname, 'fixtures/multi')}, output => {
    expect(output.stdout).to.equal(stdout)
  })
})
