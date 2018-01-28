import * as path from 'path'

import {IConfig} from '@dxcli/config'
import {load} from '@dxcli/loader'

/**
 * loads CLI plugin/multi config
 */
export default (opts: {root?: string} = {}) => ({
  async run(ctx: {config: IConfig}) {
    const {config} = await load({root: opts.root || path.dirname(module.parent!.filename)})
    ctx.config = config
  }
})
