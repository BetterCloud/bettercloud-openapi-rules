const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "servers-must-match-api-standards";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      openapi: "3.0.0",
      info: { contact: { email: "here@invalid.com" } },
      servers: [{ url: "https://petstore.bettercloud.com/capability/v1" }],
    });

    expect(res).toBeDefined();
    expect(res).toEqual([]);
  });

  it("should return an error if the server does not match requirements", async () => {
    const res = await spectral.run({
      openapi: "3.0.0",
      info: { contact: { email: "here@invalid.com" } },
      servers: [{ url: "https://app.bettercloud.com/" }],
    });

    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Schema and host in URL must match company API standards; url:https://app.bettercloud.com/ incorrect. Example: https://api.bettercloud.com/automation/v1",
      path: ["servers", "0", "url"],
      severity: 0,
    });
  });
});
