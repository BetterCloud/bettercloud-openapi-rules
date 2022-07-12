/*
 *
 * Validate that the only http actions allowed are "get", "post", "put", "patch", "delete"
 *
 */
const METHODS = ["options", "head", "trace"];

module.exports = (param, context, paths) => {
  if (METHODS.includes(param)) {
    return [
      {
        message: "http methods: options, head, and trace are not allowed",
      },
    ];
  }
};
