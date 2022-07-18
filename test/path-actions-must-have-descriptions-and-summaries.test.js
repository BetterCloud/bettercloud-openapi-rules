const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-actions-must-have-descriptions-and-summaries";

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
            summary: "List all pets",
            description: "listing all the pets",
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when path actions (get, post, delete, etc) do not have descriptions/summaries", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {},
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Every route of an API must have a description.; property: get.description is missing.",
      path: ["paths", "/pets", "get"],
      severity: 0,
    });
  });
});
