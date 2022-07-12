const { fetch } = require("@stoplight/spectral-runtime");
const { Spectral } = require("@stoplight/spectral-core");
const {
  bundleAndLoadRuleset,
} = require("@stoplight/spectral-ruleset-bundler/with-loader");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const testRulesetFilePath = "./test/test-ruleset.yml";
const spectralFilepath = "./spectral/ruleset.yml";

const testRulesetBaseContent =
  "functionsDir: ../spectral/functions\n" +
  "\n" +
  "functions:\n" +
  "  - ensurePropertiesExample\n" +
  "  - ensureAllArraysHaveItemTypes\n" +
  "  - ensureSnakeCaseWithDigits\n" +
  "  - validateOperationIdNaming\n" +
  "rules:\n";

const prepareTestRules = (ruleKeyUnderTest) => {
  // load the ruleset
  const doc = yaml.load(fs.readFileSync(spectralFilepath, "utf8"));

  // identify the rule being tested
  const ruleUnderTest = doc.rules[ruleKeyUnderTest];
  // initialize test ruleset object
  const testRuleset = yaml.load(testRulesetBaseContent);
  testRuleset.rules = {};
  testRuleset.rules[ruleKeyUnderTest] = ruleUnderTest;

  // write test ruleset to file for the spectral bundler to read
  fs.writeFileSync(testRulesetFilePath, yaml.dump(testRuleset));
};

const retrieveRuleset = async (filePath) => {
  return await bundleAndLoadRuleset(path.resolve(filePath), { fs, fetch });
};

/**
 * Creates a Spectral instance that can be run to execute our test.
 * The Spectral bundler can only load an entire ruleset file so we create a modified version that only includes the rule we want to test.
 * @param ruleKeyUnderTest  string; key of the rule being tested
 * @returns {Promise<Spectral>} promise; contains the spectral instance
 */
const setupSpectral = async (ruleKeyUnderTest) => {
  prepareTestRules(ruleKeyUnderTest);
  const ruleset = await retrieveRuleset(testRulesetFilePath);
  const spectral = new Spectral();
  spectral.setRuleset(ruleset);
  return spectral;
};

module.exports = {
  setupSpectral,
};
