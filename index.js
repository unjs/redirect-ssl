const isHTTPS = require('is-https')

// Default options
const defaults = {
    xForwardedProto: true,
    redirectPort: 443,
    redirectHost: undefined,
    statusCode: 307
}

// Creates new middleware using provided options
function create(options) {
    const { xForwardedProto, redirectPort, redirectHost, statusCode } = Object.assign({}, defaults, options)
    const _port = redirectPort === 443 ? '' : (': ' + redirectPort)

    return function redirectSSL(req, res, next) {
        if (isHTTPS(req, xForwardedProto) !== false) {
            return next()
        }

        const ـredirectURL = 'https://' + (redirectHost || req.headers.host) + _port + req.url
        res.writeHead(statusCode, { Location: ـredirectURL })
        return res.end()
    }
}

// Create a new instance using defaults 
const instance = create({})

// Assign create to instance
instance.create = create

// Export default instance
module.exports = instance