const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "headers-must-include-examples";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
      paths: {
        pets: {
          get: {
            responses: {
              200: {
                headers: {
                  "X-Rate-Limit-Reset": {
                    example: "09/14/2018 17:57:24",
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

  it("Should return an error when a header is missing an example", async () => {
    const res = await spectral.run({
      paths: {
        "/pets": {
          get: {
            responses: {
              200: {
                headers: {
                  "X-Rate-Limit-Reset": {
                    content: {
                      "text/plain": {},
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
      message: "Headers must include examples.; missing X-Rate-Limit-Reset.",
      path: [
        "paths",
        "/pets",
        "get",
        "responses",
        "200",
        "headers",
        "X-Rate-Limit-Reset",
      ],
      severity: 0,
    });
  });
});
