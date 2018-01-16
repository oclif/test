// tslint:disable no-console

import * as OS from 'os'

import {describe, expect, it, output} from '../src'

describe.stdout('stdout', () => {
  it('logs', () => {
    console.log('foo')
    expect(output.stdout).to.equal('foo\n')
  })

  it('logs twice', () => {
    console.log('foo')
    expect(output.stdout).to.equal('foo\n')
    console.log('bar')
    expect(output.stdout).to.equal('bar\n')
  })
})

describe.stdout.stderr('stdout + stderr', () => {
  it('logs and errors', () => {
    console.log('foo')
    console.error('bar')
    expect(output.stdout).to.equal('foo\n')
    expect(output.stderr).to.equal('bar\n')
  })
})

const os = ['darwin', 'win32', 'linux']
os.forEach(os => {
  describe.mock(OS, 'platform', () => os)(os, () => {
    it('sets os', () => {
      expect(OS.platform()).to.equal(os)
    })
  })
})

describe.env({foo: 'bar'})('mock env', () => {
  it('gets env', () => {
    expect(process.env).to.deep.equal({foo: 'bar'})
  })
  it.env({foo: 'baz'})('gets env from it', () => {
    expect(process.env).to.deep.equal({foo: 'baz'})
  })
  it.env()('clears env', () => {
    expect(process.env).to.deep.equal({})
  })
})

describe('chai-as-promised', () => {
  it('eventually expects', async () => {
    await expect(Promise.resolve('foo')).to.eventually.equal('foo')
  })
})
