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

## Adding new rules
Ideally, 100% of our API Standards will be programmatically enforced. As we add to our standards and/or discover ones that are not enforced, we will
want to add a Spectral rule to start enforcing it. All new rules should be of `warning` severity for a determined amount of time to give existing
OAS files a chance to adhere to the new rule before breaking the build. If you can update the OAS file to adhere to the new rule without introducing
a breaking change, feel free to make the change when you create the new rule.

All rules are defined in `./spectral/ruleset.yml`. Simply add your rule to the rules array and write unit tests to validate it works as expected.

### Writing Tests for Rules
Unit tests are written using the Jest framework\
Each rule should have a test file in the `/test` directory where the file name begins with the rule key
(Example: `servers-must-match-api-standards.test.js`)\
Each rule should have unit test(s) that sufficiently cover the happy and sad paths