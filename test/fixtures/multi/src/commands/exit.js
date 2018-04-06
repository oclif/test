const {Command, flags} = require('@oclif/command')

class CLI extends Command {
  async run() {
    const {flags} = this.parse(CLI)
    const code = parseInt(flags.code || '1')
    this.log(`exiting with code ${code}`)
    this.exit(code)
  }
}

CLI.flags = {
  code: flags.string(),
}

module.exports = CLI
