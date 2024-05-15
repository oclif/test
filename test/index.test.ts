import {Command, Flags} from '@oclif/core'
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
  }

  async run() {
    const {flags} = await this.parse(MyCommand)
    if (flags.channel.includes('stdout')) {
      this.log('hello world!')
    }

    if (flags.channel.includes('stderr')) {
      this.logToStderr('hello world!')
    }
  }
}

describe('captureOutput', () => {
  it('should capture stdout', async () => {
    const {stdout} = await captureOutput(async () => {
      await MyCommand.run(['-c=stdout'])
    })
    expect(stdout).to.equal('hello world!\n')
  })

  it('should capture stderr', async () => {
    const {stderr} = await captureOutput(async () => {
      await MyCommand.run(['-c=stderr'])
    })
    expect(stderr).to.equal('hello world!\n')
  })

  it('should capture both', async () => {
    const {stderr, stdout} = await captureOutput(async () => {
      await MyCommand.run(['-c=stdout', '-c=stderr'])
    })
    expect(stdout).to.equal('hello world!\n')
    expect(stderr).to.equal('hello world!\n')
  })
})
