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

const processDomainValues = (domainValues) => {
  /**
   * input: object, key = domain, value = int
   * output: array of level-2 assessments
   */

  const res = new Set();
  const assessments = levelTwoAssessments;

  for (const [domain, value] of Object.entries(domainValues)) {
    if (
      (domain === "substance_use" && value >= 1) ||
      (domain !== "substance_use" && value >= 2)
    ) {
      res.add(assessments[domain]);
    }
  }

  return Array.from(res);
};

module.exports = { processSurveyResponses, processDomainValues };
