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

// eslint-disable-next-line unicorn/no-static-only-class
class MockOs {
  static platform() {
    return 'not-a-platform'
  }
}

for (const os of ['darwin', 'win32', 'linux']) {
  describe(os, () => {
    test
    .stub(MockOs, 'platform', stub => stub.returns(os))
    .end('sets os', () => {
      expect(MockOs.platform()).to.equal(os)
    })
  })
}
