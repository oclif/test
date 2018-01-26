/**
 * ensures that a dxcli command or hook exits
 *
 * @param code - expected code
 * @default 0
 */
export default (code = 0) => ({
  run() {
    throw new Error(`Expected hook to exit with code ${code} but it ran without exiting`)
  },
  catch(ctx: {error: any}) {
    const err = ctx.error
    if (!err['cli-ux'] || typeof err['cli-ux'].exit !== 'number') throw err
    if (err['cli-ux'].exit !== code) {
      throw new Error(`Expected hook to exit with ${code} but exited with ${err['cli-ux'].exit}`)
    }
  }
})
