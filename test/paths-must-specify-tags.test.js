const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "paths-must-specify-tags";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          description: "Test test test",
          get: {
            tags: ["pets"],
            requestBody: {
              content: {
                "application/json": {
                  example: {
                    petId: 13,
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

  it("Should return an error when a path does not have a tag associated", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            requestBody: {
              content: {
                "application/json": {},
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
        "Every route must specify at least one tag it belongs to.; property tags is missing at: #/paths/~1pets/get.",
      path: ["paths", "/pets", "get"],
      severity: 0,
    });
  });
});
