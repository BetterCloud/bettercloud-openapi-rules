const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');

const filePath = process.argv[2] || './spectral/ruleset.yml';
const outputFilePath = process.argv[3] || './rules.md';

const parseRule = (val, key) => ({
  key,
  ...val
});

const mapRuleToRuleDoc = (rule) => {
  // console.debug('rule: ', rule);
  const ruleDoc = `<details><summary>${rule.key} (${rule.severity})</summary>\n${rule.description}</details>`;
  // console.debug('output string: ', ruleDoc);
  return ruleDoc;
};

const writeRuleDoc = (ruleDocArray) => {
  try {
    let rulesContentString = `# BetterCloud OAS Standard Rules\n\n${_.join(ruleDocArray, '\n')}`;
    fs.writeFileSync(outputFilePath, rulesContentString);
    const stats = fs.statSync(outputFilePath);
    console.log(`Readme size ${stats.size}`);
    //file written successfully
  } catch (err) {
    console.error(err)
  }
};

try {
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));

  const rules = _.map(_.get(doc, 'rules', {}), parseRule);

  // console.debug(rules);
  writeRuleDoc(_.map(rules, mapRuleToRuleDoc));

  console.log(`Documented ${_.size(rules)} rules`);
} catch (e) {
  console.log(e);
}