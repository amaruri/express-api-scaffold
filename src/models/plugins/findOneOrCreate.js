module.exports = function (schema, options) {
  schema.static('findOneOrCreate', async function (query) {
    let doc = await this.findOne({ ...query })
    if (!doc) {
      doc = await this.create(query)
    }
    return doc
  })
}
