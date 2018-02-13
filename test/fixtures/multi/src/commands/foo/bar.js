const {Command, flags} = require('@oclif/command')

class CLI extends Command {
  constructor(args, opts) {
    super(args, opts)
  }

  async run() {
    const {flags} = this.parse(CLI)
    const name = flags.name || 'world'
    this.log(`hello ${name}!`)
  }
}

CLI.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CLI
