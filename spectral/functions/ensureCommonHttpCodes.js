/*
 *
 * Ensure accepted error codes are used
 *
 */
const CODES = [
  "200",
  "201",
  "400",
  "401",
  "403",
  "404",
  "429",
  "500",
  "default",
];
module.exports = (param) => {
  if (!CODES.includes(param)) {
    return [
      {
        message:
          "You must use only use 200, 201, 400, 401, 403, 404, 429, 500 http response codes",
      },
    ];
  }
};
