import * as Config from '@anycli/config'
import * as _ from 'lodash'

import {loadConfig} from './load_config'

export function command(args: string[] | string | undefined, opts: command.Options = {}) {
  return {
    async run(ctx: {config: Config.IConfig, expectation: string}) {
      if (!ctx.config || opts.resetConfig) {
        ctx.config = loadConfig(opts.root).run({} as any)
        Config.Plugin.loadedPlugins = {}
      }
      args = _.castArray(args)
      let [cmd, ...extra] = args
      ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
      await ctx.config.runCommand(cmd, extra)
    }
  }
}

export namespace command {
  export interface Options {
    root?: string
    resetConfig?: boolean
  }
}
