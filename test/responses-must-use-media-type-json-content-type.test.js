const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "responses-must-use-media-type-json-content-type";

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
                content: {
                  "application/json": {},
                },
              },
            },
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when responses use anything other than application/json", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            responses: {
              200: {
                content: {
                  "application/pdf": {},
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
      message: "'application/json' is the only acceptable content type.",
      path: ["paths", "/pets", "get", "responses", "200", "content"],
      severity: 0,
    });
  });
});
