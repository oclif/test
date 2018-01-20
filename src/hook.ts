import {Engine} from '@dxcli/engine'
import {inspect} from 'util'

import {expect, it, output} from '.'

export interface TestHookOptions {
  description?: string
  stdout?: string | boolean
  stderr?: string | boolean
  exit?: number
  root?: string
}

export type TestHookCallback<T> = (output: T) => Promise<void> | void

export interface TestHook {
  (event: string, hookOpts: object, opts: TestHookOptions & {stdout: true, stderr: true}, fn: TestHookCallback<{stdout: string, stderr: string}>): void
  (event: string, hookOpts: object, opts: TestHookOptions & {stdout: true}, fn: TestHookCallback<{stdout: string}>): void
  (event: string, hookOpts: object, opts: TestHookOptions & {stderr: true}, fn: TestHookCallback<{stderr: string}>): void
  (event: string, hookOpts?: object, opts?: TestHookOptions, fn?: TestHookCallback<{}>): void
}

export const testHook: TestHook = (
  event: string,
  hookOpts: object = {},
  opts: TestHookOptions = {},
  fn?: TestHookCallback<any>,
) => {
  const description = opts.description || `run hook with opts: ${inspect(hookOpts)}`
  let test = it
  if (opts.stdout) test = test.stdout
  if (opts.stderr) test = test.stderr
  test(description, async () => {
    const engine = new Engine()
    await engine.load(opts.root || module.parent!.parent!.filename)
    const run = () => engine.runHook(event, hookOpts)
    if (typeof opts.exit === 'number') {
      try {
        await run()
        throw new Error(`Expected hook to exit with code ${opts.exit} but it ran without exiting`)
      } catch (err) {
        if (!err['cli-ux'] || typeof err['cli-ux'].exit !== 'number') throw err
        if (err['cli-ux'].exit !== opts.exit) {
          throw new Error(`Expected hook to exit with ${opts.exit} but exited with ${err['cli-ux'].exit}`)
        }
      }
    } else await run()
    if (typeof opts.stdout === 'string') expect(output.stdout).to.equal(opts.stdout)
    if (typeof opts.stderr === 'string') expect(output.stderr).to.equal(opts.stderr)
    if (!fn) return
    let o: any = {}
    if (opts.stdout) o.stdout = output.stdout
    if (opts.stderr) o.stderr = output.stderr
    await fn(o)
  })
}
