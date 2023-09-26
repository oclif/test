import {join} from 'node:path'

import {expect, test} from '../src'

// eslint-disable-next-line unicorn/prefer-module
const root = join(__dirname, 'fixtures/multi')

describe('hooks', () => {
  test
  .loadConfig({root})
  .stdout()
  .hook('foo', {argv: ['arg']}, {root})
  .do(output => expect(output.stdout).to.equal('foo hook args: arg\n'))
  .it()
})
