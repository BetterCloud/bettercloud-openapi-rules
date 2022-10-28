/*
 *
 * Ensure all responses are wrapped
 *
 */

const array = "array";
const ensureWrappedResponses = (param) => {
  if (array.includes(param)) {
    return [
      {
        message: "You must not return a top level array",
      },
    ];
  }
};
export default ensureWrappedResponses;
