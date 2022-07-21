const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "responses-must-contain-common-response-429";

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
            429: {},
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when oas does not have a 429", async () => {
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
        "Responses must contain common response - 429 (Too many requests). Missing responses[429]",
      path: ["paths", "/pets", "responses"],
      severity: 0,
    });
  });
});
