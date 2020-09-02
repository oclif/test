import {describe} from 'mocha'
import {expect, test} from '../src'
import {runCommand} from '../src/command'
import {loadConfigDirect} from '../src/load-config'
import * as path from 'path'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test
  .stdout()
  .do(async (ctx: any) => {
    const config = await loadConfigDirect({root})
    await runCommand(['foo:bar', '--name=foo'], config)
    expect(ctx.stdout).to.equal('hello foo!\n')
  })
  .it('runs witha a non-fancy version')

  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar'])
  .do(output => expect(output.stdout).to.equal('hello world!\n'))
  .it()

  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar', '--name=foo'])
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()

  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar', '--name=foo'])
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()
})
