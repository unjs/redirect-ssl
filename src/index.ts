import { IncomingMessage, ServerResponse } from 'http'
import isHTTPS from 'is-https'

// Default options
const defaults = {
  xForwardedProto: true,
  redirectPort: 443,
  redirectHost: '',
  redirectUnknown: true,
  enabled: true,
  statusCode: 307,
  exclude: []
}
type Options = Partial<typeof defaults>

interface Middleware {
  (req: IncomingMessage, res: ServerResponse, next?: Function): void
  create: (options: Options) => Middleware
}

const isExcluded = (url: string, patterns = []) => patterns.some(pattern => url.match(pattern))

// Creates new middleware using provided options
function create (_options?: Options): Middleware {
  const options = { ...defaults, ..._options }

  const _port = options.redirectPort === 443 ? '' : (':' + options.redirectPort)

  function redirectSSL (req: IncomingMessage, res: ServerResponse, next?: Function) {
    const url = req.url || ''

    if (!options.enabled || isExcluded(url, options.exclude)) {
      return next && next()
    }

    const _isHttps = isHTTPS(req, options.xForwardedProto)
    const shouldRedirect = options.redirectUnknown ? !_isHttps : _isHttps === false

    if (shouldRedirect) {
      const _redirectHost = (options.redirectHost || req.headers.host || '').split(':')[0]
      const ـredirectURL = 'https://' + _redirectHost + _port + url
      res.writeHead(options.statusCode, { Location: ـredirectURL })
      return res.end(ـredirectURL)
    }

    return next && next()
  }

  redirectSSL.create = create

  return redirectSSL
}

// Export a new instance using defaults
export default create({})
