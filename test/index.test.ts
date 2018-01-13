// tslint:disable no-console

import {describe, expect, output} from '../src'

describe.stdout('stdout', () => {
  it('logs', () => {
    console.log('foo')
    expect(output.stdout).to.equal('foo\n')
  })
})
