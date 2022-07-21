const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "oas-files-must-use-version-3.0.x";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      openapi: "3.0.1",
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when an unsupported oas version is used", async () => {
    const res = await spectral.run({
      openapi: "4.0.1",
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "OAS files must adhere to an openapi version of 3.0.x. All other versions are not authorized.",
      path: ["openapi"],
      severity: 0,
    });
  });
});
