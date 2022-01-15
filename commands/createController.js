const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))

if (!args.name) throw Error('Es necesario un nombre')

const modelName = `${args.name[0].toUpperCase()}${args.name.slice(1)}`
const varName = `${args.name[0].toLowerCase()}${args.name.slice(1)}`
const controllerName = `${modelName}Controller`

const file = `
const { ${modelName} } = require('../models')

const ${controllerName} = {
  model: ${modelName},

  listAll: async function (payload) {
    const ${varName} = await this.model.find(payload)

    return ${varName}
  },

  detail: async function (query) {
    const ${varName} = await this.model.findOne(query)

    return ${varName}
  },

  create: async function (payload) {
    const ${varName} = await this.model.create(payload)

    return ${varName}
  },

  update: async function (query, payload) {
    const ${varName} = await this.model.findOne(query)

    await ${varName}.set(payload).save()

    return ${varName}
  },

  delete: async function (query) {
    const ${varName} = await this.model.findOne(query)

    await ${varName}.delete()

    return ${varName}
  }
}

module.exports = ${controllerName}
`

fs.writeFileSync(`${process.cwd()}/src/controllers/${controllerName}.js`, file)
