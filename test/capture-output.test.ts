import {Command, Errors, Flags} from '@oclif/core'
import {expect} from 'chai'

import {captureOutput} from '../src'

class MyCommand extends Command {
  static flags = {
    channel: Flags.option({
      char: 'c',
      multiple: true,
      options: ['stdout', 'stderr'] as const,
      required: true,
    })(),
    throw: Flags.integer(),
  }

  async run() {
    const {flags} = await this.parse(MyCommand)

    if (flags.throw) throw new Errors.CLIError('error', {exit: flags.throw})

    if (flags.channel.includes('stdout')) {
      this.log('hello world!')
    }

    if (flags.channel.includes('stderr')) {
      this.logToStderr('hello world!')
    }

    return {success: true}
  }
}

describe('captureOutput', () => {
  it('should capture stdout', async () => {
    const {stdout} = await captureOutput(async () => MyCommand.run(['-c=stdout']))
    expect(stdout).to.equal('hello world!\n')
  })

  it('should capture stderr', async () => {
    const {stderr} = await captureOutput(async () => MyCommand.run(['-c=stderr']))
    expect(stderr).to.equal('hello world!\n')
  })

  it('should capture both', async () => {
    const {stderr, stdout} = await captureOutput(async () => MyCommand.run(['-c=stdout', '-c=stderr']))
    expect(stdout).to.equal('hello world!\n')
    expect(stderr).to.equal('hello world!\n')
  })

  it('should capture both from console', async () => {
    const {stderr, stdout} = await captureOutput(async () => {
      console.log('hello world!')
      console.error('hello world!')
    })
    expect(stdout).to.equal('hello world!\n')
    expect(stderr).to.equal('hello world!\n')
  })

  it('should capture result', async () => {
    const {result} = await captureOutput(async () => MyCommand.run(['-c=stdout']))
    expect(result).to.deep.equal({success: true})
  })

  it('should capture error', async () => {
    const {error} = await captureOutput(async () => MyCommand.run(['-c=stdout', '--throw=101']))
    expect(error?.oclif?.exit).to.equal(101)
  })
})
