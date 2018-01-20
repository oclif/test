import run from '@dxcli/engine'

import {expect, it, output} from '.'

export interface TestCommandOptions {
  description?: string
  stdout?: string | boolean
  stderr?: string | boolean
  exit?: number
  root?: string
}

export type TestCommandCallback<T> = (output: T) => Promise<void> | void

export interface TestCommand {
  (args: string[], opts: TestCommandOptions & {stdout: true, stderr: true}, fn: TestCommandCallback<{stdout: string, stderr: string}>): void
  (args: string[], opts: TestCommandOptions & {stdout: true}, fn: TestCommandCallback<{stdout: string}>): void
  (args: string[], opts: TestCommandOptions & {stderr: true}, fn: TestCommandCallback<{stderr: string}>): void
  (args: string[], opts: TestCommandOptions, fn?: TestCommandCallback<{}>): void
}

export const testCommand: TestCommand = (
  args: string[],
  opts: TestCommandOptions,
  fn?: TestCommandCallback<any>
) => {
  const description = opts.description || args.join(' ')
  let test = it
  if (opts.stdout) test = test.stdout
  if (opts.stderr) test = test.stderr
  test(description, async () => {
    const exit = opts.exit || 0
    try {
      await run(args, {root: opts.root || module.parent!.parent!.filename})
    } catch (err) {
      if (err.code !== 'EEXIT') throw err
      if (err['cli-ux'].exit !== exit) {
        throw new Error(`Expected exit code to be ${exit} but got ${err['cli-ux'].exit}`)
      }
    }
    if (typeof opts.stdout === 'string') expect(output.stdout).to.equal(opts.stdout)
    if (typeof opts.stderr === 'string') expect(output.stderr).to.equal(opts.stderr)
    if (!fn) return
    let o: any = {}
    if (opts.stdout) o.stdout = output.stdout
    if (opts.stderr) o.stderr = output.stderr
    await fn(o)
  })
}
