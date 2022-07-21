const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "oas-files-must-have-global-description";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      info: {
        description:
          "This is a running template that will eventually be used for BetterCloud OAS files and for unit testing",
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when oas files do not have a global description or if it is less than 100 characters", async () => {
    const res = await spectral.run({
      info: {},
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "OpenAPI object info `description` must be present and at least 100 characters long.",
      path: ["info"],
      severity: 0,
    });
  });
});
