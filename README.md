# size-stream [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Count the size of a stream in bytes.

Node's `res` object doesn't expose knowledge about the response size that it's
sending. By counting the bytes passed to `res` it's now possible to retrieve
both the size (e.g. for logging) and properly set the `Content-Length` header.

## Installation
```sh
$ npm install size-stream
```

## Usage
```js
const sizeStream = require('size-stream')
const stdout = require('stdout-stream')
const pump = require('pump')
const http = require('http')

http.createServer((req, res) => {
  const httpLogger = httpNdjson(req, res)
  pump(httpLogger, stdout)

  const size = sizeStream()
  size.once('size', function (size) {
    httpLogger.setSize(size)
    res.setHeader('Content-Length', size)
  })

  pump(req, router(req, res), size, res)
}).listen()
```

## API
### size = sizeStream(res)
Create a `PassThrough` stream.

### size.on('size', cb(size))
Emits the total stream size in bytes when the stream ends.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/size-stream.svg?style=flat-square
[3]: https://npmjs.org/package/size-stream
[4]: https://img.shields.io/travis/yoshuawuyts/size-stream/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/size-stream
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/size-stream/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/size-stream
[8]: http://img.shields.io/npm/dm/size-stream.svg?style=flat-square
[9]: https://npmjs.org/package/size-stream
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
