import {Interfaces} from '@oclif/core'

import {loadConfig} from './load-config'

const castArray = <T>(input?: T | T[]): T[] => {
  if (input === undefined) return []
  return Array.isArray(input) ? input : [input]
}

export function command(args: string[] | string, opts: loadConfig.Options = {}) {
  return {
    async run(ctx: {config: Interfaces.Config; expectation: string; returned: unknown}) {
      // eslint-disable-next-line require-atomic-updates
      if (!ctx.config || opts.reset) ctx.config = await loadConfig(opts).run({} as any)
      args = castArray(args)
      const [id, ...extra] = args
      // eslint-disable-next-line require-atomic-updates
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runHook('init', {id, argv: extra})
      // eslint-disable-next-line require-atomic-updates
      ctx.returned = await ctx.config.runCommand(id, extra)
    },
  }
}
