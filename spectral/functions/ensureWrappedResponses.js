/*
 *
 * Ensure all responses are wrapped
 *
 */
const array = "array";
module.exports = (input) => {
  if (array.includes(input)) {
    return [
      {
        message: "You must not return a top level array",
      },
    ];
  }
};
