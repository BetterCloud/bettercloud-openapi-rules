# BetterCloud OAS Standard Rules

<details><summary>array-params-must-have-items-with-type (error)</summary>
Array parameters must have an items attribute with a type</details>
<details><summary>array-properties-must-have-items-with-type (error)</summary>
Array properties must have an items attribute with a type</details>
<details><summary>common-responses-not-found (error)</summary>
Responses should contain common response - 404 (not found)</details>
<details><summary>common-responses-server-error (error)</summary>
Responses should contain common response - 500 (server error)</details>
<details><summary>common-responses-too-many-requests (error)</summary>
Responses should contain common response - 429 (too many requests)</details>
<details><summary>common-responses-unauthorized (error)</summary>
Responses should contain common response - 401 (unauthorized)</details>
<details><summary>contact-information (error)</summary>
Every API must have a contact containing name and email</details>
<details><summary>endpoint-must-be-ref (error)</summary>
Endpoint must be a $ref</details>
<details><summary>endpoint-ref-must-be-file (error)</summary>
Endpoint must a $ref to a file in resources/</details>
<details><summary>example-key-must-be-snake-cased (error)</summary>
example key must be snake cased (e.g. snake_case)</details>
<details><summary>headers-must-include-examples (error)</summary>
Headers must include examples</details>
<details><summary>info-description (error)</summary>
Every API must have a global description</details>
<details><summary>must-define-example-schema (error)</summary>
Every DTO must define at least one example</details>
<details><summary>must-have-content-type (error)</summary>
Every response must specify its content type</details>
<details><summary>must-have-path (error)</summary>
Every API must have at least one path</details>
<details><summary>must-have-response-body (error)</summary>
Every route returning a http status code of 200 or 201 must have a response body defined</details>
<details><summary>no-http-verbs-in-resources (error)</summary>
The HTTP Verbs should not be used in the route path to define different actions on a resource</details>
<details><summary>operation-id-camel-case (error)</summary>
Operation IDs must be camelCase since some generators (e.g. RTK Query) don't support kebab-cases.</details>
<details><summary>operationid-must-follow-naming-conventions (error)</summary>
operationIds must follow naming conventions for method</details>
<details><summary>parameter-key-must-be-snake-cased (error)</summary>
parameter key must be snake cased (e.g. snake_case)</details>
<details><summary>params-must-include-examples (error)</summary>
Parameters must include examples</details>
<details><summary>path-description-is-mandatory (error)</summary>
Every route of an API should have a description</details>
<details><summary>path-dto-reference (error)</summary>
DTOs should be used to specify the schema(data types) of a request / response</details>
<details><summary>path-must-specify-tags (error)</summary>
Every route must specify at least one tag it belongs to</details>
<details><summary>properties-must-include-examples (error)</summary>
Object properties must include examples</details>
<details><summary>ratelimit-headers (error)</summary>
Response must include ratelimit-x headers</details>
<details><summary>response-key-must-be-snake-cased (error)</summary>
response key must be snake cased (e.g. snake_case)</details>
<details><summary>schema-key-must-be-pascal-cased (error)</summary>
schema key must be pascal cased (e.g. PascalCase)</details>
<details><summary>servers-must-match-api-standards (error)</summary>
Schema and host in URL must match company API standards</details>