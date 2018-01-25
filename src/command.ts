import run from '@dxcli/engine'
import * as _ from 'lodash'

import {Options} from '.'

export default (args: string[] | string | undefined, opts: Options = {}) => async () => {
  await run(_.castArray(args), {root: opts.root || module.parent!.parent!.filename})
}
