import {IConfig, IEngine} from '@anycli/config'
import {Engine} from '@anycli/engine'

import loadConfig from './load_config'

export type WithRoot<T> = T & {root: string}

/**
 * loads CLI plugin/multi config
 */
export const _loadEngine = (opts: {root?: string} = {}) => {
  return {
    async run(ctx: {config: IConfig, engine: IEngine}) {
      if (!ctx.config) ctx.config = await loadConfig().run(opts as any)
      const EEngine: typeof Engine = require('@anycli/engine').Engine
      ctx.engine = new EEngine()
      await ctx.engine.load(ctx.config)
    }
  }
}
const loadEngine = _loadEngine as WithRoot<typeof _loadEngine>
export default loadEngine
