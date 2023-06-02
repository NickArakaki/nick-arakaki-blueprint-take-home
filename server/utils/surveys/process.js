const domainMap = require("../../db/domainMap");
const levelTwoAssessments = require("../../db/levelTwoAssessments");

const processSurveyResponses = (responses) => {
  /**
   * input: array of responses
   * output: object where each key is a domain, and the value is the sum of values of the answers associated with that domain
   */
  const normalizedDomainMap = {};
  for (const map of domainMap) {
    normalizedDomainMap[map.question_id] = map.domain;
  }

  const domainValues = {};
  for (const response of responses) {
    const { value, question_id } = response;
    const domain = normalizedDomainMap[question_id];

    if (domain in domainValues) {
      domainValues[domain] += value;
    } else {
      domainValues[domain] = value;
    }
  }

  return domainValues;
};

module.exports = { processSurveyResponses };
