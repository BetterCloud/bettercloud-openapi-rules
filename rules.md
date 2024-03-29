# BetterCloud OAS Standard Rules

<details><summary>array-params-must-have-items-with-type (error)</summary>
Array parameters must have an items attribute with a type.</details>
<details><summary>array-properties-must-have-items-with-type (error)</summary>
Array properties must have an items attribute with a type.</details>
<details><summary>component-parameters-must-be-camel-case (error)</summary>
Component parameters must be camelCase.</details>
<details><summary>component-parameters-must-have-meaningful-names (error)</summary>
Meaningful parameter names must be used in the form of {entity}Id, {entity}Description, {entity}Timestamp</details>
<details><summary>component-parameters-must-include-examples (error)</summary>
Parameters must include examples.</details>
<details><summary>component-schema-declarations-must-define-examples (error)</summary>
Every component schema declaration must define at least one example.</details>
<details><summary>component-schema-enum-properties-must-be-upper-snake-case (error)</summary>
Enums must be all uppercase with underscores and must not end in an underscore.</details>
<details><summary>component-schema-keys-must-be-pascal-case (error)</summary>
schema key must be PascalCase.</details>
<details><summary>component-schema-parameters-must-be-camel-case (error)</summary>
Schema parameters must be camelCase.</details>
<details><summary>component-schema-parameters-must-have-meaningful-description-names (error)</summary>
Meaningful schema description must be used in the form of {entity}Description. For example - customerDescription, userDescription.</details>
<details><summary>component-schema-parameters-must-have-meaningful-id-names (error)</summary>
Meaningful schema Ids must be used in the form of {entity}Id. For example - customerId, betterCloudUserId</details>
<details><summary>component-schema-parameters-must-have-meaningful-timestamp-names (error)</summary>
Meaningful schema timestamps must be used in the form of {entity}Timestamp. For example - createdTimestamp, updatedTimestamp</details>
<details><summary>component-schema-parameters-must-have-meaningful-value-names (error)</summary>
Meaningful schema values must be used in the form of {entity}Value. For example - customerValue, displayValue</details>
<details><summary>component-schema-properties-must-be-camel-case (error)</summary>
component schema properties must be camelCase.</details>
<details><summary>component-schema-time-parameters-must-use-iso8601 (error)</summary>
Time must be represented using ISO8601</details>
<details><summary>component-schemas-must-be-used (error)</summary>
Data object types must be used to specify the schema (data types) of a request response.</details>
<details><summary>headers-must-include-examples (error)</summary>
Headers must include examples.</details>
<details><summary>oas-files-must-have-contact-info (error)</summary>
Every API must have a contact containing name and email.</details>
<details><summary>oas-files-must-have-global-description (error)</summary>
Every API must have a global description</details>
<details><summary>oas-files-must-have-title-starting-with-bettercloud (error)</summary>
OAS Title must begin with "BetterCloud's". For example - BetterCloud's Automation API</details>
<details><summary>oas-files-must-use-version-3.0.x (error)</summary>
OAS files must adhere to an openapi version of 3.0.x. All other versions are not authorized.</details>
<details><summary>operation-ids-must-be-camel-case (error)</summary>
The operationId tags must be camelCase since some generators (sucha as RTK Query) don't support kebab-cases.</details>
<details><summary>operationids-must-follow-naming-conventions (error)</summary>
The operationId tags must follow naming conventions for method.</details>
<details><summary>path-actions-must-have-descriptions-and-summaries (error)</summary>
Every route of an API must have a description.</details>
<details><summary>path-http-actions-must-be-limited (error)</summary>
http actions must be limited to get, put, post, delete, and patch</details>
<details><summary>path-parameters-must-use-ref (error)</summary>
Query and Path parameters must use $ref for their schemas.</details>
<details><summary>path-request-body-schemas-must-use-ref (error)</summary>
Endpoints with request bodies must use $ref for their schemas.</details>
<details><summary>path-response-body-schemas-must-use-ref (error)</summary>
Response bodies no matter the response must use ref for their schemas.</details>
<details><summary>path-responses-must-use-error-object-schema-for-errors (error)</summary>
When responding with a 4xx or 5xx, you must add and use the approved error response in the response schema</details>
<details><summary>path-responses-must-use-qualified-status-codes (error)</summary>
You must only use allowed http response codes</details>
<details><summary>paths-must-be-kebab-case (error)</summary>
All YAML/JSON paths must be kebab-case.</details>
<details><summary>paths-must-have-descriptions (error)</summary>
Every route of an API must have a description.</details>
<details><summary>paths-must-not-use-http-verbs-in-name (error)</summary>
The HTTP Verbs must not be used in the route path to define different actions on a resource.</details>
<details><summary>paths-must-specify-tags (error)</summary>
Every route must specify at least one tag it belongs to.</details>
<details><summary>response-parameters-must-be-camel-case (error)</summary>
Response parameters must be camelCase.</details>
<details><summary>response-parameters-must-have-meaningful-description-names (error)</summary>
Meaningful response parameter timestamps must be used in the form of {entity}Description. For example - customerDescription, userDescription</details>
<details><summary>response-parameters-must-have-meaningful-id-names (error)</summary>
Meaningful response parameter ids must be used in the form of {entity}Id. For example - customerId, betterCloudUserId</details>
<details><summary>response-parameters-must-have-meaningful-timestamp-names (error)</summary>
Meaningful response parameter timestamps must be used in the form of {entity}Timestamp. For example - createdTimestamp, updatedTimestamp</details>
<details><summary>response-parameters-must-have-meaningful-value-names (error)</summary>
Meaningful response parameter values must be used in the form of {entity}Value. For example - customerValue, displayValue</details>
<details><summary>responses-must-be-wrapped-if-top-array (error)</summary>
Your responses must be wrapped</details>
<details><summary>responses-must-contain-common-response-200-or-201 (error)</summary>
Responses must contain at least one 200-level response. For example - 200, 201</details>
<details><summary>responses-must-contain-common-response-400 (error)</summary>
Responses must contain common response - 400 (Bad Request)</details>
<details><summary>responses-must-contain-common-response-401 (error)</summary>
Responses must contain common response - 401 (Unauthorized)</details>
<details><summary>responses-must-contain-common-response-403 (error)</summary>
Responses must contain common response - 403 (Forbidden)</details>
<details><summary>responses-must-contain-common-response-404 (error)</summary>
Responses must contain common response - 404 (Not found)</details>
<details><summary>responses-must-contain-common-response-406 (error)</summary>
Responses must contain common response - 406 (Not Acceptable)</details>
<details><summary>responses-must-contain-common-response-415-for-post-and-put (error)</summary>
Responses must contain common response - 415 (Unsupported Media)</details>
<details><summary>responses-must-contain-common-response-429 (error)</summary>
Responses must contain common response - 429 (Too many requests)</details>
<details><summary>responses-must-contain-common-response-500 (error)</summary>
Responses must contain common response - 500 (Server error)</details>
<details><summary>responses-must-return-response-body-with-2xx (error)</summary>
Every route returning a http status code of 200 or 201 must have a response body defined.</details>
<details><summary>responses-must-use-media-type-json-content-type (error)</summary>
'application/json' is the only acceptable content type.</details>
<details><summary>servers-must-match-api-standards (error)</summary>
Schema and host in URL must match company API standards.</details>