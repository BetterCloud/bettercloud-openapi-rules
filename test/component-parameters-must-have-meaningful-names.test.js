const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-parameters-must-have-meaningful-names";

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
            name: "petDescription",
            in: "path",
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when 'description' is used as a parameter name", async () => {
    const res = await spectral.run({
      components: {
        parameters: {
          petId: {
            name: "description",
            in: "path",
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Must use meaningful description names for parameters. Meaningful parameter names must be used in the form of {entity}Id, {entity}Description, {entity}Timestamp",
      path: ["components", "parameters", "petId", "name"],
      severity: 0,
    });
  });
});
