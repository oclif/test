import run from '@dxcli/engine'
import * as _ from 'lodash'

import {Options} from '.'

export default (args: string[] | string | undefined, opts: Options = {}) => ({
  async run(ctx: {expectation: string}) {
    args = _.castArray(args)
    ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
    await run(args, {root: opts.root || module.parent!.parent!.filename})
  }
})
