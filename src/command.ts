import run from '@dxcli/engine'
import {Plugin} from 'fancy-mocha'
import * as _ from 'lodash'

import {Options} from '.'

export default (async (next, __, args: string[] | string, opts = {}) => {
  await run(_.castArray(args), {root: opts.root || module.parent!.parent!.filename})
  await next({})
}) as Plugin<{}, (string[] | string), Partial<Options>>
