const fetch = require('node-fetch')

let userId, endpoint
const key = 'recogito-p2p-telemetry-user-id'

async function initTelemetry (_endpoint) {
  userId = window.localStorage.getItem(key)
  endpoint = _endpoint
}

function getUserId () {
  return userId
}

function setUserId (_userId) {
  userId = _userId
  window.localStorage.setItem(key, userId)
}

async function sendEvent (event) {
  return fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' }
  })
}

async function sendInit () {
  return sendEvent({
    type: 'init',
    userId
  })
}

async function sendCreate (annotation) {
  return sendEvent({
    type: 'create',
    userId,
    annotation
  })
}

async function sendOpen (annotation) {
  return sendEvent({
    type: 'open',
    userId,
    annotation
  })
}

async function sendEdit (annotation) {
  return sendEvent({
    type: 'edit',
    userId,
    annotation
  })
}

async function sendClose (annotation) {
  return sendEvent({
    type: 'close',
    userId,
    annotation
  })
}

async function sendDelete (annotation) {
  return sendEvent({
    type: 'delete',
    userId,
    annotation
  })
}

module.exports = {
  initTelemetry,
  getUserId,
  setUserId,

  sendInit,
  sendCreate,
  sendOpen,
  sendEdit,
  sendClose,
  sendDelete
}
