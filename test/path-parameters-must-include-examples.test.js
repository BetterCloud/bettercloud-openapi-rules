const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-parameters-must-include-examples";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            parameters: [
              { name: "testTimestamp", in: "path", example: "test" },
            ],
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when an example is not used with a parameter", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            parameters: [{ name: "timestamp", in: "path" }],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "Parameters must include examples.; missing 0.",
      path: ["paths", "/pets", "get", "parameters", "0"],
      severity: 0,
    });
  });
});
