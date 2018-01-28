import {IConfig} from '@dxcli/config'
import run from '@dxcli/engine'
import * as _ from 'lodash'

export default (args: string[] | string | undefined) => ({
  async run(ctx: {config: IConfig, expectation: string}) {
    args = _.castArray(args)
    ctx.expectation = ctx.expectation || `runs ${args.join(' ')}`
    await run(args, ctx.config)
  }
})
