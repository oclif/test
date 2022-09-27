import {expect} from 'chai'

// eslint-disable-next-line valid-jsdoc
/**
 * ensures that a oclif command or hook exits
 */
export default (code = 0): {
  run(): never; catch(ctx: {
    error: any
  }): void
} => ({
  run() {
    expect(process.exitCode).to.equal(code)
    throw new Error(`Expected to exit with code ${code} but it ran without exiting`)
  },
  catch(ctx: {error: any}) {
    if (!ctx.error.oclif || ctx.error.oclif.exit === undefined) throw ctx.error
    expect(ctx.error.oclif.exit).to.equal(code)
  },
})
