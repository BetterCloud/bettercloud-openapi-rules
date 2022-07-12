/*
 *
 * Validate that error required values are in the schema
 *
 */

const REQUIRED = ["code", "description", "helpLink"];

// param.schema.type will have object or array. We are looking for array of errors here
module.exports = (param) => {
  if (param.schema.type === "object") {
    return [
      {
        message:
          "You must use Errors Array Object for responses using 4xx or 5xx",
      },
    ];
  }

  // Checking to see if lengths match AND that every value and index match. This is a shallow compare
  if (
    !(
      param.schema.items.required.length === REQUIRED.length &&
      param.schema.items.required.every(function (value, index) {
        return value === REQUIRED[index];
      })
    )
  ) {
    return [
      {
        message:
          "You must use Errors Array Object for responses using 4xx or 5xx",
      },
    ];
  }
};
