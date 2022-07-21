const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "responses-must-contain-common-response-500";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          responses: {
            200: {},
            500: {},
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when oas does not return a 500", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          responses: {
            200: {},
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Responses must contain common response - 500 (Server error). Missing responses[500].",
      path: ["paths", "/pets", "responses"],
      severity: 0,
    });
  });
});
