import * as Config from '@anycli/config'

import {loadConfig} from './load_config'

export function command(args: string[] | string | undefined, opts: loadConfig.Options = {}) {
  return {
    async run(ctx: {config: Config.IConfig, expectation: string}) {
      if (!ctx.config || opts.reset) ctx.config = loadConfig(opts).run({} as any)
      args = castArray(args)
      let [cmd, ...extra] = args
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runCommand(cmd, extra)
    }
  }
}

const castArray = <T>(input?: T | T[]): T[] => {
  if (input === undefined) return []
  return Array.isArray(input) ? input : [input]
}
