const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-parameters-must-be-camel-case";

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
            parameters: [{ name: "testParam", in: "path" }],
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when path parameter is not camelCase", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            parameters: [{ name: "FalseTestParam", in: "path" }],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "Path parameters must be camelCase.",
      path: ["paths", "/pets", "get", "parameters", "0", "name"],
      severity: 0,
    });
  });
});
