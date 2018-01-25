import {Plugin} from 'fancy-mocha'

/**
 * ensures that a dxcli command or hook exits
 *
 * @param code - expected code
 * @default 0
 */
export default (code = 0) => {
  const plugin = (() => {
    throw new Error(`Expected hook to exit with code ${code} but it ran without exiting`)
  }) as Plugin
  plugin.catch = context => {
    const err = context.error
    if (!err['cli-ux'] || typeof err['cli-ux'].exit !== 'number') throw err
    if (err['cli-ux'].exit !== code) {
      throw new Error(`Expected hook to exit with ${code} but exited with ${err['cli-ux'].exit}`)
    }
  }
  return plugin
}
