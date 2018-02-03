import * as path from 'path'

import {expect, test} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test
  .loadConfig(root)
  .stdout()
  .command(['foo:bar'], {root})
  .do(output => expect(output.stdout).to.equal('hello world!\n'))
  .it()

  test
  .loadConfig(root)
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()

  test
  .loadConfig(root)
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()
})
