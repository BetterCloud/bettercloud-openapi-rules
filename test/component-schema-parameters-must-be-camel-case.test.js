const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-schema-parameters-must-be-camel-case";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      components: {
        schemas: {
          Pet: {
            type: "object",
            required: ["breedId"],
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when a schema key is not PascalCase", async () => {
    const res = await spectral.run({
      components: {
        schemas: {
          Pet: {
            type: "object",
            required: ["BreedId"],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "Schema parameters must be camelCase.",
      path: ["components", "schemas", "Pet", "required", "0"],
      severity: 0,
    });
  });
});
