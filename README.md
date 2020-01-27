# Recogito User Testing


[![DOI](https://zenodo.org/badge/221554792.svg)](https://zenodo.org/badge/latestdoi/221554792)

This repository provides tools intended for performing user testing on Pelagios' [Recogito](https://github.com/pelagios/recogito2), a platform for semantic annotation. These testing sessions aim to gather knowledge around how people actually work with Recogito, recording their actions while they interact with annotations on resources.

To record user interaction events, the telemetry module provides a microservice for receiving events via HTTP requests and storing them in a [CouchDB database](https://couchdb.apache.org/), as well as a client library that can be embedded into a JavaScript application running in the users' browsers.

The evaluation pipeline described next offers a Jupyter notebook for running simple evaluations on a dump of said database, intended to gain knowledge on users' behavioral patterns when interacting with Recogito.


## Telemetry

The telemetry module works as follows: From the telemetry client library, events are sent via standard HTTP POST requests to the telemetry microservice backend. The microservice then pushes the received events over into a CouchDB database.

To build the client library and run the microservice, you'll need a Node.js version of 12.8 or newer. Point your terminal to the telemetry directory and run `npm install` to get all dependencies.

#### Telemetry Events

(tbc).

### Microservice

The microservice is a Node.js HTTP server that pipes all events received into a CouchDB database. You can configure it with environment variables as follows:

* `PORT`: The HTTP port to listen on. Defaults to `3000`.
* `COUCHDB_URL`: A CouchDB connection URL. Example: `https://user:password@couchdb.example.com`.
* `COUCHDB_DATABASE`: The CouchDB database's name. Example: `recogito-user-testing`.

You can use a [`.env` file](https://github.com/motdotla/dotenv) to store these. Then, hit `npm start` to actually launch the server.

A Dockerfile is provided to run the microservice in an existing, containerized Docker environment. When using the Docker image, make sure to provide the above mentioned `COUCHDB_*` variables either during `docker run` or within your `docker-compose` configuration file.

### Client Library

The client browser library provides a JavaScript API to send events to the telemetry backend.

You can build the client library by running `npm run build` (regular build) or `npm run build-min` (minified build). These builds include all polyfills and shims to be executed in an ES5 environment. It can simply be added with a standard `<script>` tag, after which the API will be available via `window.RecogitoTelemetry`.

The API is conceived as a singleton and works as follows:

#### `initTelemetry(endpoint)`

Initialize the client library with the provided endpoint for the telemetry backend. This method will load the user ID from local storage—you should check, however, whether this is set. If `getUserId()` returns `undefined`, provide an ID (or ask the user for it) via `setUserID(userId)`. 

#### `getUserId()`

Return the user ID of the user who is currently active.

#### `setUserId(userId)`

Set the user ID of the user who is currently active. This ID will be stored 

#### `sendInit()`

Send an `init` event.

#### `async sendCreate(annotation)`

Send a `create` event with the respective annotation provided by Recogito.

#### `async sendOpen(annotation)`

Send an `open` event with the respective annotation.

#### `async sendEdit(annotation)`

Send an `edit` event with the respective annotation.

#### `async sendClose(annotation)`

Send a `close` event with the respective annotation.

#### `async sendDelete(annotation)`

Send a `delete` event with the respective annotation.

## Evaluation

A Jupyter notebook pipeline for evaluating the records measured during user testing sessions with the Recogito. Make sure to use the IJavaScript kernel for Jupyter (https://github.com/n-riesco/ijavascript) in order to run this notebook. Appropriate installation guides are provided within its repository.

For providing data, simply create a JSON dump of your CouchDB database, containing nothing but the events recorded by the telemetry service. Name the file `records.json` and put them next to the notebook file, `evaluation.ipynb`. Run the notebook by calling `jupyter notebook` in your terminal after moving to the `evaluation` directory. Normally, the notebook will be running at `http://localhost:8888`.

After opening the notebook, run each step to gather the respective insights into your records.

## License

[MIT License](/LICENSE), see `./LICENSE`.
