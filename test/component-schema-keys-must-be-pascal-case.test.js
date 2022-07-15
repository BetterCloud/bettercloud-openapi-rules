const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-schema-keys-must-be-pascal-case";

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
          pet: {
            type: "object",
            required: ["breedId"],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message: "schema key must be PascalCase.",
      path: ["components", "schemas", "pet"],
      severity: 0,
    });
  });
});
