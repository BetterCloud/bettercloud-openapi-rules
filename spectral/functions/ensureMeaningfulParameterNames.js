/*
 *
 * Ensure all parameters don't use 'description', 'id', 'timestamp', etc
 *
 */
const NAMES = ["description", "id", "timestamp"];

const ensureMeaningfulParameterNames = (param) => {
  if (NAMES.includes(param)) {
    return [
      {
        message: "Must use meaningful " + param + " names for parameters",
      },
    ];
  }
};

export default ensureMeaningfulParameterNames;
