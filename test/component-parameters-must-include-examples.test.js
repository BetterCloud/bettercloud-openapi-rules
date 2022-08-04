const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-parameters-must-include-examples";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      components: {
        parameters: {
          petId: {
            name: "petId",
            in: "path",
            example: 123,
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when an example is not used with a parameter", async () => {
    const res = await spectral.run({
      components: {
        parameters: {
          petId: {
            name: "petId",
            in: "path",
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "Parameters must include examples.; missing petId.",
      path: ["components", "parameters", "petId"],
      severity: 0,
    });
  });
});
