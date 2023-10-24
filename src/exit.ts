import {Errors} from '@oclif/core'
import {expect} from 'chai'

// eslint-disable-next-line valid-jsdoc
/**
 * ensures that a oclif command or hook exits
 */
export default (
  code = 0,
): {
  catch(ctx: {error: Errors.CLIError}): void
  run(): never
} => ({
  catch(ctx: {error: Errors.CLIError}) {
    if (!ctx.error.oclif || ctx.error.oclif.exit === undefined) throw ctx.error
    expect(ctx.error.oclif.exit).to.equal(code)
  },
  run() {
    expect(process.exitCode).to.equal(code)
    throw new Error(`Expected to exit with code ${code} but it ran without exiting`)
  },
})
