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
      return ensureFields(event, 'newAnnotation')

    case 'open':
      return ensureFields(event, 'annotations')

    case 'write':
      return ensureFields(event, 'annotations', 'newAnnotation')

    case 'edit':
      return ensureFields(event, 'annotations', 'updatedAnnotation')

    case 'close':
      return ensureFields(event, 'annotations')

    default:
      return false
  }
}

module.exports = { validateEvent }
