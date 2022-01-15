const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))

if (!args.name) throw Error('Es necesario un nombre')

const modelName = `${args.name[0].toUpperCase()}${args.name.slice(1)}`

const file = `
const { Schema, model } = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const findOneOrCreate = require('./plugins/findOneOrCreate')

const ${modelName}Schema = new Schema({
}, {
  timestamps: true
})

${modelName}Schema.plugin(mongooseDelete, { overrideMethods: ['find', 'findOne'] })
${modelName}Schema.plugin(findOneOrCreate)

const ${modelName} = model('${modelName}', ${modelName}Schema)

module.exports = ${modelName}
`

fs.writeFileSync(`${process.cwd()}/src/models/${modelName}.js`, file)
