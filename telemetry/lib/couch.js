const createCouchConnection = require('nano')
const uuid = require('uuid/v1')

let database

async function connectToCouch (url, databaseName) {
  const couch = createCouchConnection(url)
  database = await useDatabase(couch, databaseName)

  return database
}

function useDatabase (couch, databaseName) {
  try {
    return couch.db.use(databaseName)
  } catch (err) {
    if (err && err.statusCode !== 412) {
      console.error(
        `Database \`${databaseName}\` not found. Please inspect the thrown error.`
      )

      throw err
    } else {
      return couch.db.use(databaseName)
    }
  }
}

async function insertEntry (state) {
  database.insert(
    {
      ...state,
      timestamp: new Date().getTime()
    },
    uuid()
  )
}

module.exports = { connectToCouch, insertEntry }
