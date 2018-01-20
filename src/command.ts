import run from '@dxcli/engine'

import {expect, it, output} from '.'

export interface RunCommandOptions {
  description?: string
  stdout?: string
  stderr?: string
  exit?: number
  root?: string
}

export const testCommand = (args: string[], opts: RunCommandOptions) => {
  const description = opts.description || args[0]
  let test = it
  if (opts.stdout) test = test.stdout
  if (opts.stderr) test = test.stderr
  test(description, async () => {
    const exit = opts.exit || 0
    try {
      await run(args, {root: opts.root || module.parent!.parent!.filename})
    } catch (err) {
      if (err.code !== 'EEXIT') throw err
      if (err['cli-ux'].exitCode !== exit) {
        throw new Error(`Expected exit code to be ${exit} but got ${err['cli-ux'].exitCode}`)
      }
    }
    if (opts.stdout) expect(output.stdout).to.equal(opts.stdout)
    if (opts.stderr) expect(output.stderr).to.equal(opts.stderr)
  })
}
