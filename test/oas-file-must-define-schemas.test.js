const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "oas-file-must-define-schemas";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      openapi: "3.0.0",
      components: { schemas: { Test: {} } },
    });
    expect(res).toEqual([]);
  });

  it("should return an error if the components schemas is empty", async () => {
    const res = await spectral.run({
      openapi: "3.0.0",
      components: { schemas: {} },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Every OAS file should define at least one schema component; property schemas is missing",
      path: ["components", "schemas"],
      severity: 0,
    });
  });
});
