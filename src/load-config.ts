import {Interfaces, Config} from '@oclif/core'

/**
 * loads CLI plugin/multi config
 * @param {loadConfig.Options} opts options
 * @return {Promise<Interfaces.Config>} config
 */
export function loadConfig(opts: loadConfig.Options = {}): { run(ctx: { config: Interfaces.Config}): Promise<Interfaces.Config> } {
  return {
    async run(ctx: {config: Interfaces.Config}) {
      ctx.config = await Config.load(opts.root || loadConfig.root)
      // Always set the topicSeparator to a space so that users can write their tests using either spaces or colons
      ctx.config.topicSeparator = ' '
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
