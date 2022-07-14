const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest =
    "component-schema-declarations-must-define-examples";

let spectral;

describe(ruleKeyUnderTest, () => {
    beforeAll(async () => {
        spectral = await setupSpectral(ruleKeyUnderTest);
    });

    it("should not return any results for a valid input", async () => {
        const res = await spectral.run({
            components: {
                schemas: {
                    Pet: {
                        type: "object",
                        required: ["breedId"],
                        properties: {
                            breedId: {
                                type: "integer",
                                format: "int64",
                            },
                        },
                        example: {
                            breedId: 123,
                            name: "Bobo",
                            breed: "POODLE"
                        },
                    },
                },
            },
        });

        expect(res).toEqual([]);
    });

    it("should return an error if a schema does not define an example", async () => {
        const res = await spectral.run({
            openapi: "3.0.0",
            components: {
                schemas: {
                    Pet: {
                        type: "object",
                        required: ["breedId"],
                        properties: {
                            breedId: {
                                type: "integer",
                                format: "int64",
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
                "Every component schema declaration must define at least one example.; Data type object is lacking an example #/components/schemas/Pet.",
            path: ["components", "schemas", "Pet"],
            severity: 0,
        });
    });
});
