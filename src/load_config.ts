import {IConfig, read} from '@dxcli/config'

export type WithRoot<T> = T & {root: string}

/**
 * loads CLI plugin/multi config
 */
export const _loadConfig = (opts: {root?: string} = {}) => {
  return {
    async run(ctx: {config: IConfig}) {
      return ctx.config = await read({root: opts.root || loadConfig.root})
    }
  }
}
const loadConfig = _loadConfig as WithRoot<typeof _loadConfig>
export default loadConfig
