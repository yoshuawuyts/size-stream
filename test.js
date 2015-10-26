const getPort = require('get-server-port')
const concat = require('concat-stream')
const test = require('tape')
const http = require('http')

const sizeStream = require('./')

test('should expose a size event', function (t) {
  t.plan(3)

  const server = http.createServer(function (req, res) {
    const size = sizeStream()
    size.on('error', err => console.log(err))
    size.on('size', function (size) {
      t.equal(size, 3, 'size')
    })
    size.pipe(res)
    size.end('foo')
  }).listen()

  server.on('listening', function () {
    http.get('http://localhost:' + getPort(server), function (res) {
      res.pipe(concat(function (buf) {
        const str = String(buf)
        t.equal(typeof str, 'string', 'typeof string')
        t.equal(str, 'foo', 'message')
        server.close()
      }))
    })
  })
})
