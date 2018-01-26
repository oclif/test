import * as path from 'path'

import fancy, {expect} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  fancy
  .stdout()
  .command(['foo:bar'], {root})
  .do(output => expect(output.stdout).to.equal('hello world!\n'))
  .it()

  fancy
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()

  fancy
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()
})
