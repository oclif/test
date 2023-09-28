import {join} from 'node:path'

import {expect, test} from '../src'

// eslint-disable-next-line unicorn/prefer-module
const root = join(__dirname, 'fixtures/multi')

describe('exit', () => {
  test
  .loadConfig({root})
  .stdout()
  .command(['exit', '--code=101'])
  .exit(101)
  .do(output => expect(output.stdout).to.equal('exiting with code 101\n'))
  .it()
})
