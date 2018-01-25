import * as path from 'path'

import {expect, test} from '../src'

describe('hooks', () => {
  const stdout = `test/0.0.0 (${process.platform}-${process.arch}) node-${process.version}\n`
  const root = path.join(__dirname, 'fixtures/multi')

  test()
  .stdout()
  .hook('init', {id: '-v'}, {root})
  .exit(0)
  .run(output => expect(output.stdout).to.equal(stdout))
  .end('catches -v')

  test()
  .stdout()
  .hook('init', {id: '--version'}, {root})
  .exit(0)
  .run(output => expect(output.stdout).to.equal(stdout))
  .end('catches --version')

  test()
  .stdout()
  .hook('init', {}, {root})
  .end('does not fail')
})
