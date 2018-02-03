import * as path from 'path'

import {expect, test} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('hooks', () => {
  const stdout = `test/0.0.0 (${process.platform}-${process.arch}) node-${process.version}\n`

  test
  .loadConfig({root})
  .stdout()
  .hook('init', {id: '-v'}, {root})
  .exit(0)
  .do(output => expect(output.stdout).to.equal(stdout))
  .it('catches -v')

  test
  .loadConfig({root})
  .stdout()
  .hook('init', {id: '--version'}, {root})
  .exit(0)
  .do(output => expect(output.stdout).to.equal(stdout))
  .it('catches --version')

  test
  .loadConfig({root})
  .stdout()
  .hook('init', {}, {root})
  .it()
})
