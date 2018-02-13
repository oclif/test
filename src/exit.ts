import {expect} from 'chai'

/**
 * ensures that a oclif command or hook exits
 *
 * @param code - expected code
 * @default 0
 */
export default (code = 0) => ({
  run() {
    expect(process.exitCode).to.equal(code)
    throw new Error(`Expected hook to exit with code ${code} but it ran without exiting`)
  }
})
