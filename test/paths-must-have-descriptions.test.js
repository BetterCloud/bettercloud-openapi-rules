const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "paths-must-have-descriptions";

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

  it("Should return an error when a path does not have a description", async () => {
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
        "Every route of an API must have a description.; property: /pets.description is missing.",
      path: ["paths", "/pets"],
      severity: 0,
    });
  });
});
