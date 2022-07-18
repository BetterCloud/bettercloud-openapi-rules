const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-parameters-must-have-meaningful-timestamp-names";

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
            parameters: [{ name: "testTimestamp", in: "path" }],
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when 'timestamp' is used as a parameter name", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            parameters: [{ name: "timestamp", in: "path" }],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Meaningful path parameter timestamps must be used in the form of {entity}Timestamp. For example - createdTimestamp, updatedTimestamp",
      path: ["paths", "/pets", "get", "parameters", "0", "name"],
      severity: 0,
    });
  });
});
