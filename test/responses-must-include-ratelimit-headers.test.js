const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "responses-must-include-ratelimit-headers";

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
            responses: {
              200: {
                headers: {
                  "X-Rate-Limit-ID": {
                    content: {},
                  },
                  "X-Rate-Limit-Remaining": {
                    content: {},
                  },
                  "X-Rate-Limit-Reset": {
                    content: {},
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when responses fo not have X-Rate headers", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            responses: {
              200: {
                headers: {
                  "X-Rate-Limit-ID": {
                    content: {},
                  },
                  "X-Rate-Limit-Remaining": {
                    content: {},
                  },
                },
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
        "Response must include ratelimit-x headers.; missing headers.X-Rate-Limit-Reset.",
      path: ["paths", "/pets", "get", "responses", "200", "headers"],
      severity: 0,
    });
  });
});
