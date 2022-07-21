const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "oas-files-must-have-contact-info";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      info: {
        contact: {
          email: "devx@bettercloud.com",
          name: "DevX",
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when the oas does not have contact info", async () => {
    const res = await spectral.run({
      info: {
        contact: {},
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Every API must have a contact containing name and email.; property contact.name is missing.",
      path: ["info", "contact"],
      severity: 0,
    });
  });
});
