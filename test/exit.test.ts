import {expect} from 'chai'
import {join} from 'node:path'

import {runCommand} from '../src'

// eslint-disable-next-line unicorn/prefer-module
const root = join(__dirname, 'fixtures/multi')

describe('exit', () => {
  it('should handle expected exit codes', async () => {
    const {error, stdout} = await runCommand(['exit', '--code=101'], {root})
    expect(stdout).to.equal('exiting with code 101\n')
    expect(error?.message).to.equal('EEXIT: 101')
    expect(error?.oclif?.exit).to.equal(101)
  })
})
