const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "oas-files-must-have-title-starting-with-bettercloud";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      info: {
        title: "BetterCloud's test Suite",
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error if the oas repo name does not start with 'Bettercloud's'", async () => {
    const res = await spectral.run({
      info: {
        title: "Not BetterCloud's test Suite",
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "OAS Title must begin with \"BetterCloud's\". For example - BetterCloud's Automation API",
      path: ["info", "title"],
      severity: 0,
    });
  });
});
