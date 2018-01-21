import * as path from 'path'

import {expect, test} from '../src'

describe('hooks', () => {
  const stdout = `test/0.0.0 (${process.platform}-${process.arch}) node-${process.version}\n`
  const root = path.join(__dirname, 'fixtures/multi')

  test
  .stdout()
  .exit(0)
  .hook('init', {id: '-v'}, {root})
  .it('catches -v', output => {
    expect(output.stdout).to.equal(stdout)
  })

  test
  .stdout()
  .exit(0)
  .hook('init', {id: '--version'}, {root})
  .it('catches --version', output => {
    expect(output.stdout).to.equal(stdout)
  })

  test
  .stdout()
  .hook('init', {}, {root})
  .it('does not fail')
})
