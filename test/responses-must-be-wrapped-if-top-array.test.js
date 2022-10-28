const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "responses-must-be-wrapped-if-top-array";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
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

  it("Should return an error when 'description' is used as a parameter name", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: {
                    type: "array",
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
      message: "You must not return a top level array.",
      path: [
        "paths",
        "/pets",
        "responses",
        "200",
        "content",
        "application/json",
        "schema",
        "type",
      ],
      severity: 0,
    });
  });
});
