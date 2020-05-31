# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/nuxt-contrib/redirect-ssl/compare/v1.4.1...v2.0.0) (2020-05-31)


### ⚠ BREAKING CHANGES

* xForwardedProto renamed to trustProxy
* redirect changed to enabled and default value is always true (see example in docs)
* there might be behaviour changes for express-like frameworks

### Features

* `enabled` option ([f06e398](https://github.com/nuxt-contrib/redirect-ssl/commit/f06e3982a61bd3e6a98fdc09ab4aab85575b0e70))
* improve redirectHost type ([88cafc0](https://github.com/nuxt-contrib/redirect-ssl/commit/88cafc0fb54c6507286d5dfa9c30a5368003513b))
* rewrite to typescript ([d8460a7](https://github.com/nuxt-contrib/redirect-ssl/commit/d8460a73cd29328e055203181900bf2fa4d011b1))
* trustProxy option ([1c8cb3d](https://github.com/nuxt-contrib/redirect-ssl/commit/1c8cb3d8c769a961f96f442e922242030c0d6645))
* write redirectURL to response too ([763165b](https://github.com/nuxt-contrib/redirect-ssl/commit/763165b221a7b37957618bfe7f7f7b533790fa96))


### Bug Fixes

* fix types and redirectURL with non standard port ([e728797](https://github.com/nuxt-contrib/redirect-ssl/commit/e72879708dc4a664edd3366997f87965d6d99dfc))


### fat

* update is-https to 2.x ([d4267e7](https://github.com/nuxt-contrib/redirect-ssl/commit/d4267e76a2e176ed792a03f80b3ffebf7e39ea7e))

<a name="1.4.1"></a>
## [1.4.1](https://github.com/nuxt-community/redirect-ssl/compare/v1.4.0...v1.4.1) (2019-08-08)


### Bug Fixes

* remove space from URL when port is not 443 ([#16](https://github.com/nuxt-community/redirect-ssl/issues/16)) ([a73ca54](https://github.com/nuxt-community/redirect-ssl/commit/a73ca54))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/nuxt-community/redirect-ssl/compare/v1.3.0...v1.4.0) (2018-10-10)


### Features

* add exclude options which adds the ability to disable SSL redirect on some routes ([#5](https://github.com/nuxt-community/redirect-ssl/issues/5)) ([83867e2](https://github.com/nuxt-community/redirect-ssl/commit/83867e2))
