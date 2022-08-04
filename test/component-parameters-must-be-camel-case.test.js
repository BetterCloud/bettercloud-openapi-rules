const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-parameters-must-be-camel-case";

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
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when path parameter is not camelCase", async () => {
    const res = await spectral.run({
      components: {
        parameters: {
          petId: {
            name: "PetId",
            in: "path",
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "Component parameters must be camelCase.",
      path: ["components", "parameters", "petId", "name"],
      severity: 0,
    });
  });
});
