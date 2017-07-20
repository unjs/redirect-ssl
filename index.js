
// Default options
const defaults = {
    xForwardedProto: true,
    redirectPort: 443,
    redirectHost: undefined,
    statusCode: 307
}

function isEmpty(v) {
    return v === undefined || v === null
}

// Creates new middleware using provided options
function create(options) {
    const { xForwardedProto, redirectPort, redirectHost, statusCode } = Object.assign({}, defaults, options)
    const _port = redirectPort === 443 ? '' : (': ' + redirectPort)

    return function redirectSSL(req, res, next) {
        // Test using req.connection.encrypted
        const _encrypted = isEmpty(req.connection.encrypted) ? null : req.connection.encrypted === true

        // Test using req.protocol
        const _httpsProtocol = isEmpty(req.protocol) ? null : req.protocol === 'https'

        // Test using x-forwarded-proto header
        const _httpsXforwarded = (!xForwardedProto || isEmpty(req.headers['x-forwarded-proto'])) ? null
            : req.headers['x-forwarded-proto'].indexOf('https') !== -1

        const _noDetectionMethod = _encrypted === null && _httpsProtocol === null && _httpsXforwarded === null

        if (_encrypted || _httpsProtocol || _httpsXforwarded || _noDetectionMethod) {
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