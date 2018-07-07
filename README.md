# redirect-ssl
> Connect/Express middleware to enforce https using [is-https](https://www.npmjs.com/package/is-https).

[![npm](https://img.shields.io/npm/dt/redirect-ssl.svg?style=flat-square)](https://npmjs.com/package/redirect-ssl)
[![npm (scoped with tag)](https://img.shields.io/npm/v/redirect-ssl/latest.svg?style=flat-square)](https://npmjs.com/package/redirect-ssl)

## Usage

Install package

```bash
yarn add redirect-ssl # or npm install redirect-ssl
```

Require and use middleware (Make sure adding it as the first in the chain)

```js
const redirectSSL = require('redirect-ssl')

// Add middleware
app.use(redirectSSL)

// Or if want to provide options
app.use(redirectSSL.create({ redirectPort: 8443 }))
```

## Options

### xForwardedProto
- Default: `true`

Trust and check `x-forwarded-proto` header for HTTPS detection.

### redirect
- Default: `process.env.NODE_ENV === 'production'`

Only enabled in production environment. Force redirecting locally by setting this option to `true`.

### redirectPort
- Default: `443`

Redirect users to this port for HTTPS. (`:443` is omitted from URL as is default for `https://` schema)

### redirectHost
- Default: `undefined`

Redirects using this value as host, if omitted will use request host for redirects.

**NOTE** It should not contain schema or trailing slashes. (Example: `google.com`)

### redirectUnknown
- Default: `true`

Redirect when no SSL detection method is available too. **disable** this option if you encounter **redirect loops**.

### Status Code
- Default: `307` *Temporary Redirect*

Status code when redirecting. The reason of choosing `307` for default is:
- It prevents changing method from `POST` TO `GET` by user agents. (If you don't care, use `302` *Found*)
- Is temporary so if for any reason HTTPS disables on server clients won't hurt. (If you need permanent, use `308` *Permanent Redirect* or `301` *Moved Permanently*)
- See [This question](https://stackoverflow.com/questions/42136829/whats-difference-between-http-301-and-308-status-codes), [307 on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), and [RFC 7231 section 6.4.7](https://tools.ietf.org/html/rfc7231#section-6.4.7) for more info.

### exclude
- Default: `[]`

An array of routes patterns for which redirection should be disabled.

## License
MIT - [Nuxt.js](https://nuxtjs.org)
