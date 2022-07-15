const { setupSpectral } = require("./test-harness");

const ruleKeyUnderTest = "component-schema-time-parameters-must-use-iso8601";

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
                            testTimestamp: {
                                format: "date-time",
                                type: "string"
                            },
                        },
                    },
                },
            },
        });

        expect(res).toEqual([]);
    });

    it("Should return an error when a component property is not camelCase", async () => {
        const res = await spectral.run({
            components: {
                schemas: {
                    Pet: {
                        type: "object",
                        required: ["breedId"],
                        properties: {
                            TestTimestamp: {
                                format: "date-time",
                                type: "string"
                            },
                        },
                    },
                },
            },
        });
        expect(res).toBeDefined();
        expect(res[0]).toMatchObject({
            code: ruleKeyUnderTest,
            message: "component schema properties must be camelCase.",
            path: ["components", "schemas", "Pet", "properties", "TestTimestamp"],
            severity: 0,
        });
    });
});
