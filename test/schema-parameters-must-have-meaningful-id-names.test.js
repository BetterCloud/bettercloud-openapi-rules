const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "schema-parameters-must-have-meaningful-id-names";

let spectral;

describe(ruleKeyUnderTest, () => {
  beforeAll(async () => {
    spectral = await setupSpectral(ruleKeyUnderTest);
  });

  it("should not return any results for a valid input", async () => {
    const res = await spectral.run({
                                     openapi: "3.0.0",
                                     components: {
                                       "schemas": {
                                         "Pet": {
                                           "type": "object",
                                           "required": [
                                             "breedId"
                                           ],
                                           "properties": {
                                             "breedId": {
                                               "type": "integer",
                                               "format": "int64"
                                             }
                                           }
                                         }
                                       }
                                     }
                                   });

    expect(res).toEqual([]);
  });

  it("should return an error if a schema defines an `id` property", async () => {
    const res = await spectral.run({
                                     openapi: "3.0.0",
                                     components: {
                                       "schemas": {
                                         "Pet": {
                                           "type": "object",
                                           "required": [
                                             "id"
                                           ],
                                           "properties": {
                                             "id": {
                                               "type": "integer",
                                               "format": "int64"
                                             }
                                           }
                                         }
                                       }
                                     }
                                   });
    expect(res).toBeDefined();
    expect(res[0]).toMatchObject({
                                   code: ruleKeyUnderTest,
                                   message:
                                     "Meaningful schema ids must be used in the form of {entity}Id. ie customerId, betterCloudUserId",
                                   path: ["components", "schemas", "Pet", "required", "0"],
                                   severity: 0,
                                 });
  });
});
