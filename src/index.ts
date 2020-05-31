import { IncomingMessage, ServerResponse } from 'http'
import isHTTPS from 'is-https'

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
type Options = Partial<typeof defaults>

type MiddlewareFunction = (req: IncomingMessage, res: ServerResponse, next?: Function) => void
type Middleware = MiddlewareFunction | {
  create: (options: Options) => Middleware
}

const isExcluded = (url: string, patterns = []) => patterns.some(pattern => url.match(pattern))

// Creates new middleware using provided options
function create (options: Options): Middleware {
  const {
    xForwardedProto,
    redirectPort,
    redirectHost,
    statusCode,
    redirectUnknown,
    redirect,
    exclude
  } = Object.assign({}, defaults, options)
  const _port = redirectPort === 443 ? '' : (':' + redirectPort)

  function redirectSSL (req: IncomingMessage, res: ServerResponse, next?: Function) {
    const url = req.url || ''

    if (!redirect || isExcluded(url, exclude)) {
      return next && next()
    }

    const _isHttps = isHTTPS(req, xForwardedProto)
    const shouldRedirect = redirectUnknown ? !_isHttps : _isHttps === false

    if (shouldRedirect) {
      const ـredirectURL = 'https://' + (redirectHost || req.headers.host) + _port + url
      res.writeHead(statusCode, { Location: ـredirectURL })
      return res.end()
    }

    return next && next()
  }

  redirectSSL.create = create

  return redirectSSL
}

// Export a new instance using defaults
export default create({})
