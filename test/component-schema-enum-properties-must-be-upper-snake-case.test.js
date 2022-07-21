const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest =
    "component-schema-enum-properties-must-be-upper-snake-case";

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
                            breed: {
                                type: "string",
                                enum: ["POODLE" ,"BERNESE_MOUNTAIN_DOG"]
                            },
                        },
                    },
                },
            },
        });

        expect(res).toEqual([]);
    });

    it("Should return an error when an enum is not UPPER_SNAKE_CASE", async () => {
        const res = await spectral.run({
            components: {
                schemas: {
                    Pet: {
                        type: "object",
                        required: ["breedId"],
                        properties: {
                            breed: {
                                type: "string",
                                enum: ["POODLE" ,"fail_Me"]
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
                "Enums must be all uppercase with underscores and must not end in an underscore.",
            path: ["components", "schemas", "Pet" ,"properties", "breed", "enum", "1"],
            severity: 0,
        });
    });
});
