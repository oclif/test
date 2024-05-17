import {expect} from 'chai'
import {join} from 'node:path'

import {runCommand} from '../src'

describe('runCommand', () => {
  // eslint-disable-next-line unicorn/prefer-module
  const root = join(__dirname, 'fixtures/multi')

  it('should run a command', async () => {
    const {result, stdout} = await runCommand<{name: string}>(['foo:bar'], {root})
    expect(stdout).to.equal('hello world!\n')
    expect(result?.name).to.equal('world')
  })

  it('should run a command with a flag', async () => {
    const {result, stdout} = await runCommand<{name: string}>(['foo:bar', '--name=foo'], {root})
    expect(stdout).to.equal('hello foo!\n')
    expect(result?.name).to.equal('foo')
  })

  it('should run a command using spaces', async () => {
    const {result, stdout} = await runCommand<{name: string}>(['foo bar', '--name=foo'], {root})
    expect(stdout).to.equal('hello foo!\n')
    expect(result?.name).to.equal('foo')
  })

  it('should handle single string', async () => {
    const {result, stdout} = await runCommand<{name: string}>('foo:bar --name=foo', {root})
    expect(stdout).to.equal('hello foo!\n')
    expect(result?.name).to.equal('foo')
  })

  it('should handle expected exit codes', async () => {
    const {error, stdout} = await runCommand(['exit', '--code=101'], {root})
    expect(stdout).to.equal('exiting with code 101\n')
    expect(error?.message).to.equal('EEXIT: 101')
    expect(error?.oclif?.exit).to.equal(101)
  })
})

describe('single command cli', () => {
  // eslint-disable-next-line unicorn/prefer-module
  const root = join(__dirname, 'fixtures/single')

  it('should run a single command cli', async () => {
    const {result, stdout} = await runCommand<{name: string}>(['.'], {root})
    expect(stdout).to.equal('hello world!\n')
    expect(result?.name).to.equal('world')
  })
})
