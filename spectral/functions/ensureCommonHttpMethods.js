/*
 *
 * Validate that the only http actions allowed are "get", "post", "put", "patch", "delete"
 *
 */
const METHODS = ["options", "head", "trace"];

module.exports = (param) => {
  if (METHODS.includes(param)) {
    return [
      {
        message:
          "the following http methods are not allowed: options, head, and trace",
      },
    ];
  }
};
