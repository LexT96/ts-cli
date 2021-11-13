
import { GluegunFilesystem, GluegunToolbox } from 'gluegun'
import { warn } from 'console'
const addToIndex = (name: string, path: string, fileSystem: GluegunFilesystem) => {
    try {
      const pathToExport = `export * from './${name}';\n`;
      if (!fileSystem.exists(path)) {
        fileSystem.write(path, pathToExport)
        return;
      }
      fileSystem.append(path, pathToExport);
    } catch (e) {warn(e)}
}
  
module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      filesystem,
      print: { info },
    } = toolbox

    const name = parameters.first
    const properties = parameters.array.slice(1).map((prop) => ({
      name: prop.split(':')[0],
      type: prop.split(':')[1]
    }));

    const BASE_PATH = "interfaces";

    try {
      const target = `${BASE_PATH}/types/${name}.ts`
      await generate({
        template: 'model.ts.ejs',
        target,
        props: { name, properties }
      })
      addToIndex(name, `${BASE_PATH}/types/index.ts`, filesystem)
      info(`Generated file at ${target}`)
    } catch (e) {
      warn(e)
    }
    try {
      const target = `${BASE_PATH}/dtos/Create${name}Dto.ts`
      await generate({
        template: 'createDto.ts.ejs',
        target,
        props: { name, properties }
      })
      addToIndex(`Create${name}Dto`, `${BASE_PATH}/dtos/index.ts`, filesystem)
      info(`Generated file at ${target}`)
    } catch (e) {
      warn(e)
    }

    try {
      const target = `${BASE_PATH}/dtos/Update${name}Dto.ts`
      await generate({
        template: 'updateDto.ts.ejs',
        target: `${BASE_PATH}/dtos/Update${name}Dto.ts`,
        props: { name, properties }
      })
      addToIndex(`Update${name}Dto`, `${BASE_PATH}/dtos/index.ts`, filesystem)
      info(`Generated file at ${target}`)
    } catch (e) {
      warn(e)
    }
  },
}
