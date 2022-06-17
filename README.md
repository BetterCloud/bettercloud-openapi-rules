# BetterCloud OpenAPI Rules

This repo uses Spectral to enforce BetterCloud's API standards.
The custom ruleset defined extends Spectral's default [OpenAPI rules](https://github.com/stoplightio/spectral/blob/develop/docs/reference/openapi-rules.md).

The custom rules documentation can be found in [/rules.md](/rules.md)

Note: Custom rules must only rely on include Node modules (cannot use Lodash or other third-party dependencies)