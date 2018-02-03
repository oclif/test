import * as Config from '@anycli/config'

/**
 * loads CLI plugin/multi config
 */
export function loadConfig(opts: loadConfig.Options = {}) {
  return {
    run(ctx: {config: Config.IConfig}) {
      ctx.config = Config.load(opts.root || loadConfig.root)
      if (opts.reset) {
        Config.Plugin.loadedPlugins = {}
      }
      return ctx.config
    }
  }
}

export namespace loadConfig {
  export let root: string
  export interface Options {
    root?: string
    reset?: boolean
  }
}
