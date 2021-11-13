
import { info, warn } from 'console';
import { GluegunFilesystem, GluegunToolbox } from 'gluegun'

const remove = async (property: {name: string; type: string}, path: string, filesystem: GluegunFilesystem) => {
    const file = filesystem.read(path)
    if (file) {
        try{
            const lines = file.split('\n');
            const newLines = lines.filter(line => !(line.includes(property.name + ': ' + property.type)));
            if (lines.length !== newLines.length) {
                filesystem.write(path, newLines.join('\n'));
                info("Successfully removed property " + property.name + " from " + path);
            }
            else {
                warn("Could not find property " + property.name + " in " + path);
            }
        } catch (e) { info(e) }
    }
};
  
module.exports = {
  name: 'remove',
  alias: ['r'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      filesystem
    } = toolbox

    const name = parameters.first
    const property = parameters.second.split(':');
    const mappedProperty = {name: property[0], type: property[1]};
    remove(mappedProperty, `models/${name}.ts`, filesystem);
    remove(mappedProperty, `models/Create${name}Dto.ts`, filesystem);
    remove(mappedProperty, `models/Update${name}Dto.ts`, filesystem);
  },
}
