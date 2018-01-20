import {Engine} from '@dxcli/engine'
import {inspect} from 'util'

import {expect, it, output} from '.'

export interface TestHookOptions {
  description?: string
  stdout?: string
  stderr?: string
  exit?: number
  root?: string
}

export const testHook = (event: string, hookOpts: object = {}, opts: TestHookOptions = {}) => {
  const description = opts.description || `run hook with opts: ${inspect(hookOpts)}`
  let test = it
  if (opts.stdout) test = test.stdout
  if (opts.stderr) test = test.stderr
  test(description, async () => {
    const engine = new Engine()
    await engine.load(opts.root || module.parent!.parent!.filename)
    const run = () => engine.runHook(event, hookOpts)
    if (typeof opts.exit === 'number') await expect(run()).to.be.rejectedWith(`EEXIT: ${opts.exit}`)
    else await run()
    if (opts.stdout) expect(output.stdout).to.equal(opts.stdout)
    if (opts.stderr) expect(output.stderr).to.equal(opts.stderr)
  })
}
