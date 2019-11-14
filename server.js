const express = require('express')
const cors = require('cors')
const { connectToCouch, insertEntry } = require('./lib/couch')
const { validateEvent } = require('./lib/event')

if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}

const requiredArgs = ['COUCHDB_URL', 'COUCHDB_DATABASE']

async function main () {
  if (!requiredArgs.every(arg => !!process.env[arg])) {
    console.error(`Some required environment arguments weren't set:
${JSON.stringify(requiredArgs, null, 2)}`)
    process.exit(1)
  }

  await connectToCouch(process.env.COUCHDB_URL, process.env.COUCHDB_DATABASE)

  const app = express()
  app.use(express.json())

  app.use(cors())
  app.options('*', cors())

  app.post('/event', cors(), async (req, res) => {
    const event = req.body
    if (!validateEvent(event)) {
      res.status(400).send('bad request')
      return
    }

    try {
      await insertEntry(event)
      res.status(200).send('ok')
    } catch (err) {
      console.error('Unexpected error:', err)
      res.status(500).send('internal server error')
    }
  })

  const server = app.listen(process.env.PORT || 3000, () =>
    process.stdout.write(`Server listening on port ${server.address().port}.\n`)
  )
}
main()
