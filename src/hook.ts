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
export default (event: string, hookOpts: object = {}, options: loadConfig.Options = {}) => ({
  async run(ctx: {config: Interfaces.Config; expectation: string}) {
    if (!event) throw new Error('no hook provided')
    // eslint-disable-next-line require-atomic-updates
    if (!ctx.config) ctx.config = await loadConfig(options).run({} as any)
    // eslint-disable-next-line require-atomic-updates
    ctx.expectation = ctx.expectation || `runs ${event} hook`
    await ctx.config.runHook(event, hookOpts || {})
  },
})
