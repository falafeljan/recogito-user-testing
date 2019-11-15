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

async function sendCreate (newAnnotation) {
  return sendEvent({
    type: 'create',
    userId,
    newAnnotation
  })
}

async function sendOpen (annotation) {
  return sendEvent({
    type: 'open',
    userId,
    annotation
  })
}

async function sendWrite (annotation, newAnnotation) {
  return sendEvent({
    type: 'open',
    userId,
    annotation,
    newAnnotation
  })
}

async function sendEdit (annotation, updatedAnnotation) {
  return sendEvent({
    type: 'open',
    userId,
    annotation,
    updatedAnnotation
  })
}

async function sendClose (annotation) {
  return sendEvent({
    type: 'open',
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
  sendWrite,
  sendEdit,
  sendClose,
  sendDelete
}
