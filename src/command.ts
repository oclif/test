import {IConfig} from '@dxcli/config'
import run from '@dxcli/engine'
import * as _ from 'lodash'

import loadConfig from './load_config'

export default (args: string[] | string | undefined) => ({
  async run(ctx: {config: IConfig, expectation: string}) {
    if (!ctx.config) ctx.config = await loadConfig().run({} as any)
    args = _.castArray(args)
    ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
    await run(args, ctx.config)
  }
})
