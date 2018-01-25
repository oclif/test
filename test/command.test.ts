import * as path from 'path'

import test, {expect} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test()
  .stdout()
  .command(['foo:bar'], {root})
  .it('runs foo:bar', output => {
    expect(output.stdout).to.equal('hello world!\n')
  })

  test()
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .it('runs foo:bar', output => {
    expect(output.stdout).to.equal('hello foo!\n')
  })

  test()
  .stdout()
  .command(['foo:bar', '--name=foo'], {root})
  .it('runs foo:bar', output => {
    expect(output.stdout).to.equal('hello foo!\n')
  })
})
