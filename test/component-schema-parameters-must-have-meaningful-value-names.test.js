const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest =
  "component-schema-parameters-must-have-meaningful-value-names";

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
            required: ["testValue"],
            properties: {
              testTimestamp: {
                format: "date-time",
                type: "string",
              },
            },
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when timestamp is used as a component property", async () => {
    const res = await spectral.run({
      components: {
        schemas: {
          Pet: {
            type: "object",
            required: ["value"],
            properties: {
              testTimestamp: {
                format: "date-time",
                type: "string",
              },
            },
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Meaningful schema values must be used in the form of {entity}Value. For example - customerValue, displayValue",
      path: ["components", "schemas", "Pet", "required", "0"],
      severity: 0,
    });
  });
});
