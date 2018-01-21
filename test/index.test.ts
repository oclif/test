// tslint:disable no-console

import * as OS from 'os'

import {expect, test} from '../src'

describe('stdout', () => {
  test
  .stdout()
  .it('logs', output => {
    console.log('foo')
    expect(output.stdout).to.equal('foo\n')
  })

  test
  .stdout()
  .it('logs twice', output => {
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
  .it('logs and errors', output => {
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
    .mock(OS, 'platform', () => os)
    .it('sets os', () => {
      expect(OS.platform()).to.equal(os)
    })
  })
})

describe('mock env', () => {
  test
  .env({foo: 'bar'})
  .it('gets env', () => {
    expect(process.env).to.deep.equal({foo: 'bar'})
  })

  test
  .env({foo: 'baz'})
  .it('gets env from it', () => {
    expect(process.env).to.deep.equal({foo: 'baz'})
  })

  test
  .env()
  .it('clears env', () => {
    expect(process.env).to.deep.equal({})
  })
})

describe('chai-as-promised', () => {
  it('eventually expects', async () => {
    await expect(Promise.resolve('foo')).to.eventually.equal('foo')
  })
})
