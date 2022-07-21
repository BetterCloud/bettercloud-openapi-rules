const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest =
  "component-schema-parameters-must-have-meaningful-description-names";

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
            required: ["testDescription"],
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

  it("Should return an error when description is used as a component property", async () => {
    const res = await spectral.run({
      components: {
        schemas: {
          Pet: {
            type: "object",
            required: ["description"],
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
        "Meaningful schema description must be used in the form of {entity}Description. For example - customerDescription, userDescription.",
      path: ["components", "schemas", "Pet", "required", "0"],
      severity: 0,
    });
  });
});
