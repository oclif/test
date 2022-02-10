import * as path from 'path'

import {expect, test} from '../src'

// eslint-disable-next-line unicorn/prefer-module
const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar'])
  .do(output => expect(output.stdout).to.equal('hello world!\n'))
  .it()

  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar', '--name=foo'])
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()

  test
  .loadConfig({root})
  .stdout()
  .command(['foo bar', '--name=foo'])
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()
})
