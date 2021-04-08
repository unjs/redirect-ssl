# redirect-ssl
> Connect/Express middleware to enforce https using [is-https](https://www.npmjs.com/package/is-https).

[![version][npm-v-src]][npm-v-href]
[![downloads][npm-d-src]][npm-d-href]
[![ci][ci-src]][ci-href]

## Usage

Install package:

```bash
yarn add redirect-ssl
# or
npm install redirect-ssl
```

Require and use `redirect-ssl`. Make sure to use this middlware as the first in your middleware chain (if using express see [middleware chain](http://expressjs.com/en/guide/using-middleware.html):

```js
import redirectSSL from 'redirect-ssl'
// or
const redirectSSL = require('redirect-ssl')

// Add middleware
app.use(redirectSSL)

// Using custom options
app.use(redirectSSL.create({ redirectPort: 8443 }))
```

### Disable for non-production or localhost

If you want to disable on `localhost`, use the exclude option:

```js
app.use(redirectSSL.create({
   exclude: ['localhost']
}))
```

Only enable in production environments:

```js
app.use(redirectSSL.create({
  enabled: process.env.NODE_ENV === 'production'
}))
```

## Options

### trustProxy

- Default: `true`

Trust and check `x-forwarded-proto` header for HTTPS detection.

### enabled

- Default: `true`

### redirectPort

- Default: `443`

Redirect users to this port for HTTPS. (`:443` is omitted from URL as is default for `https://` schema)

### redirectHost

- Default: `req.headers.host`

Redirects using this value as host, if omitted will use request host for redirects.

**NOTE** It should not contain schema or trailing slashes. (Example: `google.com`)

### redirectUnknown

- Default: `true`

Redirect when no SSL detection method is available too. **disable** this option if you encounter **redirect loops**.

### statusCode

- Default: `307` *Temporary Redirect*

Status code when redirecting. The reason of choosing `307` for default is:
- It prevents changing method from `POST` TO `GET` by user agents. (If you don't care, use `302` *Found*)
- Is temporary so if for any reason HTTPS disables on server clients won't hurt. (If you need permanent, use `308` *Permanent Redirect* or `301` *Moved Permanently*)
- See [This question](https://stackoverflow.com/questions/42136829/whats-difference-between-http-301-and-308-status-codes), [307 on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), and [RFC 7231 section 6.4.7](https://tools.ietf.org/html/rfc7231#section-6.4.7) for more info.

### exclude

- Default: `[]`

An array of routes patterns for which redirection should be disabled.

## Using with [Nuxt.js](https://github.com/nuxt/nuxt.js)

Add the `redirect-ssl` to the [`serverMiddleware`](https://nuxtjs.org/api/configuration-servermiddleware#usage) array within in the [nuxt.config.js](https://nuxtjs.org/api/configuration-server) file is the preferred usage:

```js
import redirectSSL from 'redirect-ssl'

export default {
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
     }),
  ]
}
```

You will still need to install this package within your project for it work.

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/redirect-ssl?style=flat-square
[npm-v-href]: https://npmjs.com/package/redirect-ssl

[npm-d-src]: https://img.shields.io/npm/dm/redirect-ssl?style=flat-square
[npm-d-href]: https://npmjs.com/package/redirect-ssl

[ci-src]: https://img.shields.io/github/workflow/status/unjs/redirect-ssl/ci/master?style=flat-square
[ci-href]: https://github.com/unjs/redirect-ssl/actions?query=workflow%3Aci
