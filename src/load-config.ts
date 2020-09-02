import * as Config from '@oclif/config'

/**
 * loads CLI plugin/multi config
 * @param {loadConfig.Options} opts options
 * @return {Promise<Config.IConfig>} config
 */
export function loadConfig(opts: loadConfig.Options = {}) {
  return {
    async run(ctx: { config: Config.IConfig }) {
      ctx.config = await Config.load(opts.root || loadConfig.root)
      return ctx.config
    },
  }
}

export namespace loadConfig {
  export let root: string
  export interface Options {
    root?: string;
    reset?: boolean;
  }
}

export async function loadConfigDirect(options?: { root?: string }) {
  const fallback = module.parent!.filename
  return Config.load((options && options.root) || fallback)
}
