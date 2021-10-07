import * as path from 'path'

import {expect, test} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('command', () => {
  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar'])
  .do(output => {
    expect(output.stdout).to.equal('hello world!\n')
    let {name} = output.returned as {name: string}
    expect(name).to.equal('world')
  })
  .it()

  test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar', '--name=foo'])
  .do(output => expect(output.stdout).to.equal('hello foo!\n'))
  .it()
})
