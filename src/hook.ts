import * as Config from '@anycli/config'

import {loadConfig} from './load_config'

/**
 * tests a anycli hook
 *
 * @example <caption>check that when the 'init' hook is ran it outputs "this output"</caption>
 * testHook('init', {id: 'mycommand'}, {stdout: true}, output => {
 *   expect(output.stdout).to.contain('this output')
 * })
 *
 * @param event - hook to run
 * @param hookOpts - options to pass to hook. Config object will be passed automatically.
 */
export default (event?: string, hookOpts: object = {}) => ({
  async run(ctx: {config: Config.IConfig, expectation: string}) {
    if (!event) throw new Error('no hook provided')
    if (!ctx.config) ctx.config = loadConfig().run({} as any)
    ctx.expectation = ctx.expectation || `runs ${event} hook`
    await ctx.config.runHook(event, hookOpts || {})
  }
})
