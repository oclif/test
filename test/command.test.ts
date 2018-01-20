import * as path from 'path'

import {describe, expect, testCommand} from '../src'

describe('command', () => {
  testCommand(['foo:bar'], {stdout: 'hello world!\n', root: path.join(__dirname, 'fixtures/multi')})
  testCommand(['foo:bar', '--name=foo'], {stdout: 'hello foo!\n', root: path.join(__dirname, 'fixtures/multi')})
  testCommand(['foo:bar', '--name=foo'], {stdout: true, root: path.join(__dirname, 'fixtures/multi')}, ({stdout}) => {
    expect(stdout).to.equal('hello foo!\n')
  })
})
