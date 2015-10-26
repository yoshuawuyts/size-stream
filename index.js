const stream = require('readable-stream')
const util = require('util')

module.exports = CountStream

// create a new count stream
// obj? -> tstream
function CountStream (opts) {
  if (!(this instanceof CountStream)) return new CountStream(opts)

  stream.PassThrough.call(this, opts)
  this.destroyed = false
  this.size = 0
}

util.inherits(CountStream, stream.PassThrough)

// .end() function. Emits a 'size' event.
// (obj?, str?, fn) -> tstream
CountStream.prototype.end = function (data, enc, cb) {
  if (typeof data === 'function') return this.end(null, null, data)
  if (typeof enc === 'function') return this.end(data, null, enc)
  if (data) this.write(data)
  this.emit('size', this.size)
  return stream.PassThrough.prototype.end.call(this, cb)
}

// .write() data to the stream.
// str|buf -> tstream
CountStream.prototype.write = function (chunk) {
  this.size += chunk.length
  return stream.PassThrough.prototype.write.call(this, chunk)
}

// .destroy() method. Allows early stream ending
// any? -> null
CountStream.prototype.destroy = function (err) {
  if (this.destroyed) return
  this.destroyed = true
  if (err) this.emit('error')
  this.emit('close')
}
