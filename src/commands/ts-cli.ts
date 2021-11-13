
import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'ts-cli',
  run: async toolbox => {
    const { print } = toolbox
    print.info('Welcome to my CLI')
    print.info('Available commands: add, generate, remove')
    print.info('add syntax: name properties (name:type)[]')
    print.info('generate syntax: name properties (name:type)[]')
    print.info('remove syntax: name property (name:type)')
  },
}

module.exports = command
