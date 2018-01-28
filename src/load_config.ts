import {IConfig} from '@dxcli/config'
import {load} from '@dxcli/loader'

export type WithRoot<T> = T & {root: string}

/**
 * loads CLI plugin/multi config
 */
export const _loadConfig = (opts: {root?: string} = {}) => {
  return {
    async run(ctx: {config: IConfig}) {
      const {config} = await load({root: opts.root || loadConfig.root})
      return ctx.config = config
    }
  }
}
const loadConfig = _loadConfig as WithRoot<typeof _loadConfig>
export default loadConfig
