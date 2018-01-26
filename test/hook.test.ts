import * as path from 'path'

import fancy, {expect} from '../src'

describe('hooks', () => {
  const stdout = `test/0.0.0 (${process.platform}-${process.arch}) node-${process.version}\n`
  const root = path.join(__dirname, 'fixtures/multi')

  fancy
  .stdout()
  .hook('init', {id: '-v'}, {root})
  .exit(0)
  .do(output => expect(output.stdout).to.equal(stdout))
  .it('catches -v')

  fancy
  .stdout()
  .hook('init', {id: '--version'}, {root})
  .exit(0)
  .do(output => expect(output.stdout).to.equal(stdout))
  .it('catches --version')

  fancy
  .stdout()
  .hook('init', {}, {root})
  .it()
})
