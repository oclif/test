import {Interfaces, toStandardizedId} from '@oclif/core'

import {loadConfig} from './load-config'

const castArray = <T>(input?: T | T[]): T[] => {
  if (input === undefined) return []
  return Array.isArray(input) ? input : [input]
}

export function command(args: string[] | string, opts: loadConfig.Options = {}): {
  run(ctx: {
    config: Interfaces.Config; expectation: string; returned: unknown
  }): Promise<void>
} {
  return {
    async run(ctx: {config: Interfaces.Config; expectation: string; returned: unknown}) {
      if (!ctx.config || opts.reset) ctx.config = await loadConfig(opts).run({} as any)
      args = castArray(args)
      const [id, ...extra] = args
      const cmdId = toStandardizedId(id, ctx.config)
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runHook('init', {id: cmdId, argv: extra})
      ctx.returned = await ctx.config.runCommand(cmdId, extra)
    },
  }
}
