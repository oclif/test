import * as path from 'path'

import {describe, testCommand} from '../src'

describe('command', () => {
  testCommand(['foo:bar'], {stdout: 'hello world!\n', root: path.join(__dirname, 'fixtures/multi')})
  testCommand(['foo:bar', '--name=foo'], {stdout: 'hello foo!\n', root: path.join(__dirname, 'fixtures/multi')})
})
