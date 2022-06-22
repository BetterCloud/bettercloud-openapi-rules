# BetterCloud OpenAPI Rules

This repo uses Spectral to enforce BetterCloud's API standards.
The custom ruleset defined extends Spectral's default [OpenAPI rules](https://github.com/stoplightio/spectral/blob/develop/docs/reference/openapi-rules.md).

The custom rules documentation can be found in [/rules.md](/rules.md)

Note: Custom rules must only rely on include Node modules (cannot use Lodash or other third-party dependencies)

TODO: add rule for ensuring Error resonse for all error codes
```yaml
error-response:
    given: "$.paths..responses[?( @property >= 300)].content.*"
    severity: error
    then:
      field: schema
      function: schema
      functionOptions:
        schema:
          "$ref": "#/components/schemas/Error"
```

```yaml
error-schema:
    severity: error
    recommended: true
    given: "$.components.schemas"
    then:
      function: schemaDefinition
      field: Error
      functionOptions:
        definition:
          type: object
          properties:
            code:
              type: string
              required: true
            id:
              type: string
              required: true
            href:
              type: string
              required: true
            reason:
              type: string
              required: true
```