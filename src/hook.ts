import {Engine} from '@dxcli/engine'
import {Plugin} from 'fancy-mocha'

import {Options} from './options'

/**
 * tests a dxcli hook
 *
 * @example <caption>check that when the 'init' hook is ran it outputs "this output"</caption>
 * testHook('init', {id: 'mycommand'}, {stdout: true}, output => {
 *   expect(output.stdout).to.contain('this output')
 * })
 *
 * @param event - hook to run
 * @param hookOpts - options to pass to hook. Config object will be passed automatically.
 * @param opts - test options
 */
export default (async (next, __, event, hookOpts, opts = {}) => {
  const engine = new Engine()
  await engine.load(opts.root || module.parent!.parent!.filename)
  await engine.runHook(event!, hookOpts || {})
  await next({})
}) as Plugin<{}, string, object, Partial<Options>>
