const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-schema-declarations-must-define-examples";

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

  it("Should return an error when a schema is used without an example", async () => {
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
        "Every schema declaration must define at least one example.; the data type object is lacking an example #/paths/~1pets/get/requestBody/content/application~1json.",
      path: [
        "paths",
        "/pets",
        "get",
        "requestBody",
        "content",
        "application/json",
      ],
      severity: 0,
    });
  });
});
