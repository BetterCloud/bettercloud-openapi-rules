/*
 *
 * Ensure all properties with the word 'time' use iso8601 format and type
 *
 */
module.exports = (param) => {
  for (const [key, value] of Object.entries(param)) {
    if (key.toLowerCase().includes("time")) {
      if (
        !(
          "format" in value &&
          "type" in value &&
          value.type === "string" &&
          value.format === "date-time"
        )
      ) {
        return [
          {
            message:
              "You must define 'type: string' and 'format: date-time' for all time properties",
          },
        ];
      }
    }
  }
};
