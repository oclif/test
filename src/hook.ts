import {Interfaces} from '@oclif/core'

import {loadConfig} from './load-config'

// eslint-disable-next-line valid-jsdoc
/**
 * tests a oclif hook
 *
 * @example <caption>check that when the 'init' hook is ran it outputs "this output"</caption>
 * testHook('init', {id: 'mycommand'}, {stdout: true}, output => {
 *   expect(output.stdout).to.contain('this output')
 * })
 *
 * @param {string} event hook to run
 * @param {object} hookOpts options to pass to hook. Config object will be passed automatically.
 */
export default (event: string, hookOpts: Record<string, unknown> = {}, options: loadConfig.Options = {}): {
  run(ctx: {
    config: Interfaces.Config; expectation: string; returned: unknown
  }): Promise<void>;
} => ({
  async run(ctx: {config: Interfaces.Config; expectation: string; returned: unknown}) {
    if (!event) throw new Error('no hook provided')
    if (!ctx.config) ctx.config = await loadConfig(options).run({} as any)
    ctx.expectation = ctx.expectation || `runs ${event} hook`
    ctx.returned = await ctx.config.runHook(event, hookOpts || {})
  },
})
