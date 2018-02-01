const {Command, flags, parse} = require('@anycli/command')
const {cli} = require('cli-ux')

class CLI extends Command {
  constructor(args, opts) {
    super(args, opts)
    this.options = parse(args, CLI)
  }

  async run() {
    const name = this.options.flags.name || 'world'
    cli.log(`hello ${name}!`)
  }
}

CLI.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CLI
