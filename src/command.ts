import * as Config from '@anycli/config'
import * as _ from 'lodash'

import {loadConfig} from './load_config'

export function command(args: string[] | string | undefined, opts: loadConfig.Options = {}) {
  return {
    async run(ctx: {config: Config.IConfig, expectation: string}) {
      if (!ctx.config || opts.reset) ctx.config = loadConfig(opts).run({} as any)
      args = _.castArray(args)
      let [cmd, ...extra] = args
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runCommand(cmd, extra)
    }
  }
}
