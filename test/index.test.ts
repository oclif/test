// tslint:disable no-console

import * as OS from 'os'

import {expect, test} from '../src'

describe('stdout', () => {
  test
    .stdout()
    .end('logs', output => {
      console.log('foo')
      expect(output.stdout).to.equal('foo\n')
    })

  test
    .stdout()
    .end('logs twice', output => {
      console.log('foo')
      expect(output.stdout).to.equal('foo\n')
      console.log('bar')
      expect(output.stdout).to.equal('foo\nbar\n')
    })
})

describe('stdout + stderr', () => {
  test
    .stdout()
    .stderr()
    .end('logs and errors', output => {
      console.log('foo')
      console.error('bar')
      expect(output.stdout).to.equal('foo\n')
      expect(output.stderr).to.equal('bar\n')
    })
})

const os = ['darwin', 'win32', 'linux']
os.forEach(os => {
  describe(os, () => {
    test
      .stub(OS, 'platform', () => os)
      .end('sets os', () => {
        expect(OS.platform()).to.equal(os)
      })
  })
})
