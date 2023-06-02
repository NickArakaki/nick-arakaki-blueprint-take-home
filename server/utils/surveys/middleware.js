const { isValidSurveyResponses } = require("./validators");
const { processSurveyResponses, processDomainValues } = require("./process");
const survey = require("../../db/survey");

const validateSurvey = (req, res, next) => {
  const error = new Error("Invalid Responses");
  error.status = 400;
  error.title = "Bad Request";

  const responses = req.body.answers;
  const surveyQuestions = survey.content.sections[0].questions;
  const surveyAnswers = survey.content.sections[0].answers;

  if (isValidSurveyResponses(responses, surveyQuestions, surveyAnswers)) {
    return next();
  } else {
    return next(error);
  }
};

const processSurvey = (req, _res, next) => {
  const responses = req.body.answers;
  const domainValues = processSurveyResponses(responses);
  const assessments = processDomainValues(domainValues);
  req.results = assessments;

  return next();
};

module.exports = {
  validateSurvey,
  processSurvey,
};
