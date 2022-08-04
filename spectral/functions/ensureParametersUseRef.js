/*
 *
 * Ensure all parameters don't use 'description', 'id', 'timestamp', etc
 *
 */
const REF = ["$ref"];

const ensureParametersUseRef = (param) => {
  for (let key in param) {
    if (!REF.includes(key)) {
      return [
        {
          message: "All Query and Path params must use $ref",
        },
      ];
    }
  }
};

export default ensureParametersUseRef;
