# Migrating from v3 to v4

- [Migrating from v3 to v4](#migrating-from-v3-to-v4)
  - [`.command()`](#command)
  - [`.exit()`](#exit)
  - [`.hook()`](#hook)
  - [`.stdout() and .stderr()`](#stdout-and-stderr)
  - [`.loadConfig()`](#loadconfig)
  - [`.do()`](#do)
  - [`.catch()`](#catch)
  - [`.finally()`](#finally)
  - [`.env()`](#env)
  - [`.stub()`](#stub)
  - [`.add()`](#add)
  - [`.stdin()`](#stdin)
  - [`.retries()`](#retries)
  - [`.timeout()`](#timeout)
  - [`.nock()`](#nock)

## `.command()`

`.command()` allowed you to run a command from your CLI. This can now be achieved with the `runCommand` function.

**Before**

```typescript
import {expect, test} from '@oclif/test'

describe('my cli', () => {
  test
    .stdout()
    .command(['hello:world'])
    .it('runs hello world cmd', (ctx) => {
      expect(ctx.stdout).to.contain('hello world!')
    })
})
```

**After**

```typescript
import {expect} from 'chai'
import {runCommand} from '@oclif/test'

describe('my cli', () => {
  it('should run the command', async () => {
    const {stdout} = await runCommand<{name: string}>(['hello:world'])
    expect(stdout).to.contain('hello world')
  })
})
```

**Before (Single Command CLI)**

```typescript
import {expect, test} from '@oclif/test'

describe('my cli', () => {
  test
    .stdout()
    .command(['.'])
    .it('runs hello world cmd', (ctx) => {
      expect(ctx.stdout).to.contain('hello world!')
    })
})
```

**After (Single Command CLI)**

```typescript
import {expect} from 'chai'
import {runCommand} from '@oclif/test'

describe('my cli', () => {
  it('should run the command', async () => {
    const {stdout} = await runCommand<{name: string}>(['.'])
    expect(stdout).to.contain('hello world')
  })
})
```

## `.exit()`

`.exit()` allowed you to test that command exited with a certain exit code. This can now be done by inspecting the `error` that's returned by `runCommand`

**Before**

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

**After**

```typescript
import {expect} from 'chai'
import {runCommand} from '@oclif/test'

describe('exit', () => {
  it('should exit with code 101', async () => {
    const {error} = await runCommand<{name: string}>(['hello:world', '--code=101'])
    expect(error?.oclif?.exit).to.equal(101)
  })
})
```

## `.hook()`

`.hook()` allowed you to test a hook in your CLI. This can now be accomplished using the `runHook` function.

**Before**

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

**After**

```typescript
import {join} from 'node:path'
import {expect} from 'chai'
import {runHook} from '@oclif/test'

const root = join(__dirname, 'fixtures/test-cli')
describe('my cli', () => {
  it('should run hook', async () => {
    const {stdout} = await runHook('foo', {argv: ['arg']}, {root})
    expect(stdout).to.equal('foo hook args: arg\n')
  })
})
```

## `.stdout() and .stderr()`

Version 3 allowed you to access the output in stdout and stderr by attaching it to the `context`. This is now replaced by the `stdout` and `stderr` strings that are returned by `runCommand`, `runHook`, and `captureOutput`

**Before**

```javascript
describe('stdmock tests', () => {
  fancy
    .stdout()
    .stderr()
    .it('mocks stdout and stderr', (context) => {
      console.log('foo')
      console.error('bar')
      expect(context.stdout).to.equal('foo\n')
      expect(context.stderr).to.equal('bar\n')
    })
})
```

**After**

```typescript
import {expect} from 'chai'
import {captureOutput} from '@oclif/test'

describe('stdmock tests', () => {
  it('mocks stdout and stderr', async () => {
    const {stdout, stderr} = await captureOutput(async () => {
      console.log('foobar')
      console.error('bar')
    })

    expect(stdout).to.equal('foo\n')
    expect(stderr).to.equal('bar\n')
  })
})
```

## `.loadConfig()`

`.loadConfig()` allowed you to explicitly set the root of the CLI to be tested. This can now be achieved by passing the path into the `runCommand` function.

**Before**

```typescript
import {join} from 'node:path'
import {expect, test} from '@oclif/test'

const root = join(__dirname, 'fixtures/test-cli')
describe('my cli', () => {
  test
    .loadConfig({root})
    .stdout()
    .command(['foo:bar'])
    .it('should run the command from the given directory', (ctx) => {
      expect(ctx.stdout).to.equal('hello world!\n')
      const {name} = ctx.returned as {name: string}
      expect(name).to.equal('world')
    })
})
```

**After**

```typescript
import {join} from 'node:path'
import {expect} from 'chai'
import {runCommand} from '@oclif/test'

const root = join(__dirname, 'fixtures/test-cli')

describe('my cli', () => {
  it('should run the command from the given directory', async () => {
    const {result, stdout} = await runCommand<{name: string}>(['foo:bar'], {root})
    expect(result.name).to.equal('world')
  })
})
```

## `.do()`

`.do()` allowed you to execute some arbitrary code within the test pipeline. There's not a direct replacement in version 4, however, you are still able to execute arbitrary code within your chosen test framework. For example, mocha exposes the `beforeEach` and `before` hooks.

## `.catch()`

`.catch()` allowed you to catch errors in a declarative way and ensure that the error was actually thrown. We encourage you to use the utilities provided by your preferred testing framework to accomplish this.

## `.finally()`

`.finally()` allowed you to run a task at the end of a test, even if it failed. We encourage you to use the utilities provided by your preferred testing framework to accomplish this (for instance, mocha provided `afterEach` and `after` lifecycle hooks).

## `.env()`

`.env()` allowed you to set the environment variables before running the test. If you need this, you can easily implement it yourself.

**Before**

```javascript
describe('env tests', () => {
  fancy.env({FOO: 'BAR'}).it('mocks FOO', () => {
    expect(process.env.FOO).to.equal('BAR')
    expect(process.env).to.not.deep.equal({FOO: 'BAR'})
  })
})
```

**After**

```javascript
describe('env tests', () => {
  let originalEnv

  beforeEach(() => {
    originalEnv = {...process.env}
    process.env = {
      ...originalEnv
      FOO: 'BAR'
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('mocks FOO', () => {
    expect(process.env.FOO).to.equal('BAR')
    expect(process.env).to.not.deep.equal({FOO: 'BAR'})
  })
})
```

## `.stub()`

`.stub()` allowed you to stub any object and ensure that the stubs were cleared before the next test. We encourage you to use a dedicated library like [sinon](https://www.npmjs.com/package/sinon) for this.

## `.add()`

`.add()` allowed you to extend the `context` object that was used throughout fancy-tests. There is no direct replacement for this in version 4.

## `.stdin()`

`.stdin()` allowed you mock stdin. There is no direct replacement for this in version 4. You can use [mock-stdin](https://www.npmjs.com/package/mock-stdin) directly if you need this functionality.

## `.retries()`

`.retries()` allowed you to retry the test. There is no direct replacement for this but most testing frameworks have functionality for this builtin.

## `.timeout()`

`.timeout` allowed to set a timeout for a test. There is no direct replacement for this but most testing frameworks have functionality for this builtin.

## `.nock()`

`.nock` allowed you to use [nock](https://www.npmjs.com/package/nock) to mock HTTP requests. There is no direct replacement for since you can use [nock](https://www.npmjs.com/package/nock) directly if you need to.
