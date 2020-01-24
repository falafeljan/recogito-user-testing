const ensureFields = (obj, fields) =>
  fields.every(field => typeof obj[field] !== 'undefined')

function validateEvent (event) {
  if (!event || !ensureFields(event, ['type', 'userId'])) {
    return false
  }

  switch (event.type) {
    case 'init':
      return true

    case 'create':
      return ensureFields(event, ['annotation'])

    case 'open':
      return ensureFields(event, ['annotation'])

    case 'edit':
      return ensureFields(event, ['annotation'])

    case 'close':
      return ensureFields(event, ['annotation'])

    case 'delete':
      return ensureFields(event, ['annotation'])

    default:
      return false
  }
}

module.exports = { validateEvent }
