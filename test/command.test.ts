import * as path from 'path'

import test, {expect} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test()
  .stdout()
  .command(['foo:bar'], {root})
  .run(output => expect(output.stdout).to.equal('hello world!\n'))
  .end('runs foo:bar')

  test()
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .run(output => expect(output.stdout).to.equal('hello foo!\n'))
  .end('runs foo:bar')

  test()
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .run(output => expect(output.stdout).to.equal('hello foo!\n'))
  .end('runs foo:bar')
})
