import {Config, Interfaces} from '@oclif/core'

/**
 * loads CLI plugin/multi config
 * @param {loadConfig.Options} opts options
 * @return {Promise<Interfaces.Config>} config
 */
export function loadConfig(opts: loadConfig.Options = {}): {
  run(ctx: {config: Interfaces.Config}): Promise<Interfaces.Config>
} {
  return {
    async run(ctx: {config: Interfaces.Config}) {
      ctx.config = await Config.load(opts.root || loadConfig.root)
      return ctx.config
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace loadConfig {
  export let root: string
  export interface Options {
    reset?: boolean
    root?: string
  }
}
