const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "path-parameters-must-use-ref";

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
            parameters: [{ $ref: "#/components/parameters/petId" }],
          },
        },
      },
      components: {
        parameters: {
          petId: {
            name: "petId",
            in: "path",
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
            parameters: [{ name: "testId", in: "query" }],
          },
        },
      },
    });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
      code: ruleKeyUnderTest,
      message:
        "Query and Path parameters must use $ref for their schemas.; 0 incorrect.",
      path: ["paths", "/pets", "get", "parameters", "0"],
      severity: 0,
    });
  });
});
