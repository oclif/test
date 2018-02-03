import {IConfig} from '@anycli/config'
import * as _ from 'lodash'

import {loadConfig} from './load_config'

export default (args: string[] | string | undefined) => ({
  async run(ctx: {config: IConfig, expectation: string}) {
    if (!ctx.config) ctx.config = loadConfig().run({} as any)
    args = _.castArray(args)
    let [cmd, ...extra] = args
    ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
    await ctx.config.runCommand(cmd, extra)
  }
})
