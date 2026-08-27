import {expect} from 'chai'
import path from 'node:path'

import {runHook} from '../src/index.js'

// eslint-disable-next-line unicorn/prefer-module
const root = path.join(__dirname, 'fixtures/multi')

describe('runHook', () => {
  it('should run a hook', async () => {
    const {stdout} = await runHook('foo', {argv: ['arg']}, {root})
    expect(stdout).to.equal('foo hook args: arg\n')
  })
})
