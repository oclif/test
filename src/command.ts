import * as Config from '@oclif/config'

import {loadConfig, loadConfigDirect} from './load-config'

const castArray = <T>(input?: T | T[]): T[] => {
  if (input === undefined) return []
  return Array.isArray(input) ? input : [input]
}

export function command(args: string[] | string, opts: loadConfig.Options = {}) {
  return {
    async run(ctx: {config: Config.IConfig; expectation: string}) {
      // eslint-disable-next-line require-atomic-updates
      if (!ctx.config || opts.reset) ctx.config = await loadConfig(opts).run({} as any)
      args = castArray(args)
      const [id, ...extra] = args
      // eslint-disable-next-line require-atomic-updates
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runHook('init', {id, argv: extra})
      await ctx.config.runCommand(id, extra)
    },
  }
}

export async function runCommand(args: string[], config?: Config.IConfig) {
  if (!config) {
    config = await loadConfigDirect()
  }

  args = castArray(args)
  const [id, ...extra] = args

  await config.runHook('init', {id, argv: extra})
  await config.runCommand(id, extra)
}

export async function findCommand(id: string, config?: Config.IConfig) {
  if (!config) {
    config = await loadConfigDirect()
  }

  return config.findCommand(id)
}

