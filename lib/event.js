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
      return ensureFields(event, 'annotation')

    case 'write':
      return ensureFields(event, 'annotation', 'newAnnotation')

    case 'edit':
      return ensureFields(event, 'annotation', 'updatedAnnotation')

    case 'close':
      return ensureFields(event, 'annotation')

    default:
      return false
  }
}

module.exports = { validateEvent }
