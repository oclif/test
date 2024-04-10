import {join} from 'node:path'

import {expect, test} from '../src'

describe('command', () => {
  // eslint-disable-next-line unicorn/prefer-module
  const root = join(__dirname, 'fixtures/multi')
  test
    .loadConfig({root})
    .stdout()
    .command(['foo:bar'])
    .do((output) => {
      expect(output.stdout).to.equal('hello world!\n')
      const {name} = output.returned as {name: string}
      expect(name).to.equal('world')
    })
    .it()

  test
    .loadConfig({root})
    .stdout()
    .command(['foo:bar', '--name=foo'])
    .do((output) => expect(output.stdout).to.equal('hello foo!\n'))
    .it()

  test
    .loadConfig({root})
    .stdout()
    .command(['foo bar', '--name=foo'])
    .do((output) => expect(output.stdout).to.equal('hello foo!\n'))
    .it()
})

describe('single command cli', () => {
  // eslint-disable-next-line unicorn/prefer-module
  const root = join(__dirname, 'fixtures/single')
  test
    .loadConfig({root})
    .stdout()
    .command(['.'])
    .do((output) => {
      expect(output.stdout).to.equal('hello world!\n')
      const {name} = output.returned as {name: string}
      expect(name).to.equal('world')
    })
    .it()
})
