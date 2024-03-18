# @oclif/test

test helpers for oclif CLIs

[![Version](https://img.shields.io/npm/v/@oclif/test.svg)](https://npmjs.org/package/@oclif/test)
[![Downloads/week](https://img.shields.io/npm/dw/@oclif/test.svg)](https://npmjs.org/package/@oclif/test)
[![License](https://img.shields.io/npm/l/@oclif/test.svg)](https://github.com/oclif/test/blob/main/package.json)

## Usage

`@oclif/test` is an extension of [fancy-test](https://github.com/oclif/fancy-test). Please see the [fancy-test documentation](https://github.com/oclif/fancy-test#fancy-test) for all the features that are available.

The following are the features that `@oclif/test` adds to `fancy-test`.

### `.loadConfig()`

`.loadConfig()` creates and returns a new [`Config`](https://github.com/oclif/core/blob/main/src/config/config.ts) instance. This instance will be available on the `ctx` variable that's provided in the callback.

```typescript
import {join} from 'node:path'
import {expect, test} from '@oclif/test'

const root = join(__dirname, 'fixtures/test-cli')
test
  .loadConfig({root})
  .stdout()
  .command(['foo:bar'])
  .it('should run the command from the given directory', (ctx) => {
    expect(ctx.stdout).to.equal('hello world!\n')
    expect(ctx.config.root).to.equal(root)
    const {name} = ctx.returned as {name: string}
    expect(name).to.equal('world')
  })
```

If you would like to run the same test without using `@oclif/test`:

```typescript
import {Config, ux} from '@oclif/core'
import {expect} from 'chai'
import {join} from 'node:path'
import {SinonSandbox, SinonStub, createSandbox} from 'sinon'

const root = join(__dirname, 'fixtures/test-cli')
describe('non-fancy test', () => {
  let sandbox: SinonSandbox
  let config: Config
  let stdoutStub: SinonStub

  beforeEach(async () => {
    sandbox = createSandbox()
    stdoutStub = sandbox.stub(ux.write, 'stdout')
    config = await Config.load({root})
  })

  afterEach(async () => {
    sandbox.restore()
  })

  it('should run command from the given directory', async () => {
    const {name} = await config.runCommand<{name: string}>('foo:bar')
    expect(stdoutStub.calledWith('hello world!\n')).to.be.true
    expect(config.root).to.equal(root)
    expect(name).to.equal('world')
  })
})
```

### `.command()`

`.command()` let's you run a command from your CLI.

```typescript
import {expect, test} from '@oclif/test'

describe('hello world', () => {
  test
    .stdout()
    .command(['hello:world'])
    .it('runs hello world cmd', (ctx) => {
      expect(ctx.stdout).to.contain('hello world!')
    })
})
```

For a [single command cli](https://oclif.io/docs/single_command_cli) you would provide `'.'` as the command. For instance:

```typescript
import {expect, test} from '@oclif/test'

describe('hello world', () => {
  test
    .stdout()
    .command(['.'])
    .it('runs hello world cmd', (ctx) => {
      expect(ctx.stdout).to.contain('hello world!')
    })
})
```

If you would like to run the same test without using `@oclif/test`:

```typescript
import {Config, ux} from '@oclif/core'
import {expect} from 'chai'
import {SinonSandbox, SinonStub, createSandbox} from 'sinon'

describe('non-fancy test', () => {
  let sandbox: SinonSandbox
  let config: Config
  let stdoutStub: SinonStub

  beforeEach(async () => {
    sandbox = createSandbox()
    stdoutStub = sandbox.stub(ux.write, 'stdout')
    config = await Config.load({root: process.cwd()})
  })

  afterEach(async () => {
    sandbox.restore()
  })

  it('should run command', async () => {
    // use '.' for a single command CLI
    const {name} = await config.runCommand<{name: string}>('hello:world')
    expect(stdoutStub.calledWith('hello world!\n')).to.be.true
    expect(name).to.equal('world')
  })
})
```

### `.exit()`

`.exit()` let's you test that a command exited with a certain exit code.

```typescript
import {join} from 'node:path'
import {expect, test} from '@oclif/test'

describe('exit', () => {
  test
    .loadConfig()
    .stdout()
    .command(['hello:world', '--code=101'])
    .exit(101)
    .do((output) => expect(output.stdout).to.equal('exiting with code 101\n'))
    .it('should exit with code 101')
})
```

If you would like to run the same test without using `@oclif/test`:

```typescript
import {Config, Errors, ux} from '@oclif/core'
import {expect} from 'chai'
import {SinonSandbox, createSandbox} from 'sinon'

describe('non-fancy test', () => {
  let sandbox: SinonSandbox
  let config: Config

  beforeEach(async () => {
    sandbox = createSandbox()
    sandbox.stub(ux.write, 'stdout')
    config = await Config.load({root: process.cwd()})
  })

  afterEach(async () => {
    sandbox.restore()
  })

  it('should run command from the given directory', async () => {
    try {
      await config.runCommand('.')
      throw new Error('Expected CLIError to be thrown')
    } catch (error) {
      if (error instanceof Errors.CLIError) {
        expect(error.oclif.exit).to.equal(101)
      } else {
        throw error
      }
    }
  })
})
```

### `.hook()`

`.hook()` let's you test a hook in your CLI.

```typescript
import {join} from 'node:path'

import {expect, test} from '@oclif/test'

const root = join(__dirname, 'fixtures/test-cli')

describe('hooks', () => {
  test
    .loadConfig({root})
    .stdout()
    .hook('foo', {argv: ['arg']}, {root})
    .do((output) => expect(output.stdout).to.equal('foo hook args: arg\n'))
    .it('should run hook')
})
```

If you would like to run the same test without using `@oclif/test`:

```typescript
import {Config, ux} from '@oclif/core'
import {expect} from 'chai'
import {SinonSandbox, SinonStub, createSandbox} from 'sinon'

describe('non-fancy test', () => {
  let sandbox: SinonSandbox
  let config: Config
  let stdoutStub: SinonStub

  beforeEach(async () => {
    sandbox = createSandbox()
    stdoutStub = sandbox.stub(ux.write, 'stdout')
    config = await Config.load({root: process.cwd()})
  })

  afterEach(async () => {
    sandbox.restore()
  })

  it('should run hook', async () => {
    const {name} = await config.runHook('foo', {argv: ['arg']})
    expect(stdoutStub.calledWith('foo hook args: arg\n')).to.be.true
  })
})
```
