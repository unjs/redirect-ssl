const isHTTPS = require('is-https')

// Default options
const defaults = {
    xForwardedProto: true,
    redirectPort: 443,
    redirectHost: undefined,
    redirectUnknown: true,
    statusCode: 307
}

// Creates new middleware using provided options
function create(options) {
    const { xForwardedProto, redirectPort, redirectHost, statusCode, redirectUnknown } = Object.assign({}, defaults, options)
    const _port = redirectPort === 443 ? '' : (': ' + redirectPort)

    return function redirectSSL(req, res, next) {
        const _isHttps = isHTTPS(req, xForwardedProto)

        if (_isHttps === false || (redirectUnknown && _isHttps === null)) {
            const ـredirectURL = 'https://' + (redirectHost || req.headers.host) + _port + req.url
            res.writeHead(statusCode, { Location: ـredirectURL })
            return res.end()
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