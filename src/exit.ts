import {CLIError} from 'cli-ux'

/**
 * ensures that a dxcli command or hook exits
 *
 * @param code - expected code
 * @default 0
 */
export default (code = 0) => {
  let err: CLIError
  return {
    catch(_: any, e: CLIError) {
      err = e
      if (!err['cli-ux'] || typeof err['cli-ux'].exit !== 'number') throw err
      if (err['cli-ux'].exit !== code) {
        throw new Error(`Expected hook to exit with ${code} but exited with ${err['cli-ux'].exit}`)
      }
    },
    finally() {
      if (!err) throw new Error(`Expected hook to exit with code ${code} but it ran without exiting`)
    }
  }
}
