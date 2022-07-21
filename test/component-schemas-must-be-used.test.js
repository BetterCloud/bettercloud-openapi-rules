const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-schemas-must-be-used";

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

  it("Should return an error when components.schemas is empty", async () => {
    const res = await spectral.run({
      components: {
        schemas: {},
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Data object types must be used to specify the schema (data types) of a request response.; property schemas is missing.",
      path: ["components", "schemas"],
      severity: 0,
    });
  });
});
