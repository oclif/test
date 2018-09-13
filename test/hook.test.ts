import * as path from 'path'

import {expect, test} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('hooks', () => {
  test
    .loadConfig({root})
    .stdout()
    .hook('foo', {argv: ['arg']}, {root})
    .do(output => expect(output.stdout).to.equal('foo hook args: arg\n'))
    .it()
})
