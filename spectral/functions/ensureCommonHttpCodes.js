/*
 *
 * Ensure accepted error codes are used
 *
 */
const CODES = [
  "200",
  "201",
  "202",
  "204",
  "400",
  "401",
  "403",
  "404",
  "406",
  "409",
  "415",
  "429",
  "500",
  "default",
];
module.exports = (param) => {
  if (!CODES.includes(param)) {
    return [
      {
        message:
          "You must use only use the following for http response codes: " +
          CODES,
      },
    ];
  }
};
