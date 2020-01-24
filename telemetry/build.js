const fs = require('fs')
const { parse: parsePath } = require('path')
const mkdirp = require('mkdirp')
const browserify = require('browserify')
const parseArgs = require('minimist')

const { debug, out: outputPath } = parseArgs(process.argv.slice(2), {
  string: ['outputPath'],
  boolean: ['debug'],
  alias: {
    debug: ['d'],
    out: ['o']
  },
  default: {
    debug: false,
    out: undefined
  }
})

const babelConf = JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`, 'utf8'))
const target =
  outputPath !== undefined ? fs.createWriteStream(outputPath) : process.stdout
mkdirp.sync(parsePath(`${__dirname}/dist`).dir)

const bundler = browserify(`${__dirname}/index.js`, {
  standalone: 'RecogitoTelemetry',
  debug
})
bundler
  .transform('babelify', {
    ...babelConf
    /* only: [
      /^(?:.*\/node_modules\/(?:hyperswarm|hyperswarm-ws|hyperswarm-proxy|debug)\/|(?!.*\/node_modules\/)).*$/,
    ], */
  })
  .bundle()
  .pipe(target)
