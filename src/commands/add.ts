
import { info } from 'console';
import { GluegunFilesystem, GluegunToolbox } from 'gluegun'

const add = (properties: {name: string; type: string}[], path: string, filesystem: GluegunFilesystem) => {
    const file = filesystem.read(path)
    if (file) {
        try{
            const closingBrackets = file.split("}");
            const injectionLocation = closingBrackets[closingBrackets.length - 2];
            const injection = `${properties.map((prop) => `\t${prop.name}: ${prop.type}`).join(',\n')},\n`;
            const newFile = file.replace(injectionLocation, injectionLocation + injection);
            filesystem.write(path, newFile);
        } catch (e) { info(e) }
    }
};
  
module.exports = {
  name: 'add',
  alias: ['a'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      filesystem
    } = toolbox

    const name = parameters.first
    const properties = parameters.array.slice(1).map((prop) => ({
    name: prop.split(':')[0],
    type: prop.split(':')[1]
    }));
    add(properties, `models/${name}.ts`, filesystem);
    add(properties, `models/Create${name}Dto.ts`, filesystem);
    add(properties, `models/Update${name}Dto.ts`, filesystem);
  },
}
