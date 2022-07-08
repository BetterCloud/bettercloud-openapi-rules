/*
 *
 * Validate that the operationId follows the naming conventions for method
 * in order to maintain consistency.
 *
 */
const METHODS = ["get", "post", "put", "patch", "delete"];
const DELETE = ["delete", "destroy", "remove", "purge", "untag"];
const GET = ["get", "list", "search"];
const PATCH = ["patch"];
const POST = [
  "create",
  "post",
  "add",
  "tag",
  "install",
  "reset",
  "upgrade",
  "recycle",
  "run",
  "retry",
  "validate",
  "assign",
  "search",
];
const PUT = ["update"];

const articles = ["_a_", "_an_", "_the_"];

const validateOperation = (method, path, operationId) => {
  // expects camelCase, gets the substring up to first capital
  const prefix = operationId.split(/(?=[A-Z])/)[0];

  switch (method) {
    case "delete":
      if (!DELETE.includes(prefix)) {
        return [
          {
            message: `${method.toUpperCase()} ${path} - ${operationId} should start with one of: ${DELETE.join(
              ", "
            )}. Prefer 'delete'.`,
          },
        ];
      }
      break;
    case "get":
      if (!GET.includes(prefix)) {
        return [
          {
            message: `${method.toUpperCase()} ${path} - ${operationId} should start with one of: ${GET.join(
              ", "
            )}. Prefer 'get' for retrieving a single object and 'list' for multiple objects.`,
          },
        ];
      }
      break;
    case "patch":
      if (!PATCH.includes(prefix)) {
        return [
          {
            message: `${method.toUpperCase()} ${path} - ${operationId} should start with one of: ${PATCH.join(
              ", "
            )}. Prefer 'patch'.`,
          },
        ];
      }
      break;
    case "post":
      if (!POST.includes(prefix)) {
        return [
          {
            message: `${method.toUpperCase()} ${path} - ${operationId} should start with one of: ${POST.join(
              ", "
            )}. Prefer 'create' for new resources. Custom verbs may be acceptable for clarity.`,
          },
        ];
      }
      break;
    case "put":
      if (!PUT.includes(prefix)) {
        return [
          {
            message: `${method.toUpperCase()} ${path} - ${operationId} should start with one of: ${PUT.join(
              ", "
            )}. Prefer 'update'.`,
          },
        ];
      }
      break;
    default:
      break;
  }

  for (let i in articles) {
    if (operationId.includes(articles[i])) {
      return [
        {
          message: `${operationId} - operationId should not include an article (a, an, or the).`,
        },
      ];
    }
  }
};

const validateOperationIdNaming = (endpoint, options, { path }) => {
  const endpointOperations = Object.entries(endpoint)
    .map((endpointObject, method) => {
      if (METHODS.includes(method.toString().toLowerCase())) {
        return validateOperation(method, "path", endpointObject.operationId);
      } else {
        return null;
      }
    })
    .flat();

  return endpointOperations.filter((operation) => operation != null);
};

export default validateOperationIdNaming;
