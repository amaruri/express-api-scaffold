const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))

if (!args.name) throw Error('Es necesario un nombre')

const path = `/${args.name.toLowerCase()}`

const file = `
const Router = require('../../utils/router')

const router = new Router('${path}')

router.get(
  {
    path: ''
  },
  async (req, res) => {
    // Do some stuff
  }
)

router.get(
  {
    path: '/:id'
  },
  async (req, res) => {
    // Do some stuff
  }
)

router.put(
  {
    path: '/:id'
  },
  async (req, res) => {
    // Do some stuff
  }
)

router.post(
  {
    path: ''
  },
  async (req, res) => {
    // Do some stuff
  }
)

router.delete(
  {
    path: '/:id'
  }, async (req, res) => {
    // Do some stuff
  }
)

module.exports = router.routes
`

fs.writeFileSync(`${process.cwd()}/src/routes/v1/${args.name}.js`, file)
