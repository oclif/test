import * as Config from '@anycli/config'

/**
 * loads CLI plugin/multi config
 */
export function loadConfig(root?: string) {
  return {
    run(ctx: {config: Config.IConfig}) {
      return ctx.config = Config.load(root || loadConfig.root)
    }
  }
}

export namespace loadConfig {
  export let root: string
}
