import run from '@dxcli/engine'
import * as _ from 'lodash'

import {Options} from '.'

export default (args: string[] | string, opts: Options = {}) => {
  return {
    async before() {
      args = _.castArray(args)
      await run(args, {root: opts.root || module.parent!.parent!.filename})
    }
  }
}
      // const exit = opts.exit || 0
      // try {
      //   await run(args, {root: opts.root || module.parent!.parent!.filename})
      // } catch (err) {
      //   if (err.code !== 'EEXIT') throw err
      //   if (err['cli-ux'].exit !== exit) {
      //     throw new Error(`Expected exit code to be ${exit} but got ${err['cli-ux'].exit}`)
      //   }
      // }
