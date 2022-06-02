# BetterCloud OAS Standard Rules

<details><summary>common-responses-not-found (error)</summary>
Responses should contain common response - 404 (not found)</details>
<details><summary>common-responses-server-error (error)</summary>
Responses should contain common response - 500 (server error)</details>
<details><summary>common-responses-too-many-requests (error)</summary>
Responses should contain common response - 429 (too many requests)</details>
<details><summary>common-responses-unauthorized (error)</summary>
Responses should contain common response - 401 (unauthorized)</details>
<details><summary>contact-information (error)</summary>
Every API must have a contact containing name, email and a url</details>
<details><summary>endpoint-must-be-ref (error)</summary>
Endpoint must be a $ref</details>
<details><summary>endpoint-ref-must-be-file (error)</summary>
Endpoint must a $ref to a file in resources/</details>
<details><summary>http-verbs-should-be-used (error)</summary>
HTTP verbs should be used to express different actions or functions on a resource</details>
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
<details><summary>operationid-must-be-snake-cased (error)</summary>
operationIds must be snake cased (e.g. snake_case)</details>
<details><summary>params-must-include-examples (error)</summary>
Parameters must include examples</details>
<details><summary>path-description-is-mandatory (error)</summary>
Every route of an API should have a description</details>
<details><summary>path-dto-reference (error)</summary>
DTOs should be used to specify the schema(data types) of a request / response</details>
<details><summary>path-must-include-version (error)</summary>
Path must include the version</details>
<details><summary>path-must-match-api-standards (error)</summary>
API Path must match company API uri standards</details>
<details><summary>path-must-specify-tags (error)</summary>
Every route must specify at least one tag it belongs to</details>
<details><summary>ratelimit-headers (error)</summary>
Response must include ratelimit-x headers</details>
<details><summary>servers-must-match-api-standards (error)</summary>
Schema and host in URL must match company API standards</details>