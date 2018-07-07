const isHTTPS = require('is-https')

// Default options
const defaults = {
  xForwardedProto: true,
  redirectPort: 443,
  redirectHost: undefined,
  redirectUnknown: true,
  statusCode: 307,
  redirect: process.env.NODE_ENV === 'production',
  exclude: []
}

const isExcluded = function (url, patterns = []) {
  return patterns.some(pattern => url.match(pattern))
}

// Creates new middleware using provided options
function create (options) {
  const {
    xForwardedProto,
    redirectPort,
    redirectHost,
    statusCode,
    redirectUnknown,
    redirect,
    exclude
  } = Object.assign({}, defaults, options)
  const _port = redirectPort === 443 ? '' : (': ' + redirectPort)

  return function redirectSSL (req, res, next) {
    if (redirect && !isExcluded(req.url, exclude)) {
      const _isHttps = isHTTPS(req, xForwardedProto)
      const shouldRedirect = _isHttps === false || (redirectUnknown && _isHttps === null)
      if (shouldRedirect) {
        const ـredirectURL = 'https://' + (redirectHost || req.headers.host) + _port + req.url
        res.writeHead(statusCode, { Location: ـredirectURL })
        return res.end()
      }
    }

    return next()
  }
}

// Create a new instance using defaults
const instance = create({})

// Assign create to instance
instance.create = create

// Export default instance
module.exports = instance
