import * as path from 'path'

import {expect, test} from '../src'

const root = path.join(__dirname, 'fixtures/multi')

describe('loadEngine', () => {
  test
  .loadConfig({root})
  .loadEngine()
  .it('has an engine', ctx => {
    expect(ctx.engine.commandIDs).to.have.members([
      'foo:bar',
      'version',
    ])
  })
})
