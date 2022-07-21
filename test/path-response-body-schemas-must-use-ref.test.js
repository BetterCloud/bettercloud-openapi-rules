const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-response-body-schemas-must-use-ref";

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
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Pet",
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Pet: {
            type: "object",
            required: ["breedId"],
          },
        },
      },
    });

    expect(res).toEqual([]);
  });

  it("Should return an error when $ref is not used for schemas", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            responses: {
              200: {
                content: {
                  "application/json": {
                    schema: {
                      default: "test",
                    },
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
        "Response bodies no matter the response must use ref for their schemas.; schema is incorrect.",
      path: [
        "paths",
        "/pets",
        "get",
        "responses",
        "200",
        "content",
        "application/json",
        "schema",
      ],
      severity: 0,
    });
  });
});
