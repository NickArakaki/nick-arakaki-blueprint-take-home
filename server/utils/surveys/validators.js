const validateSurveyResponses = (responses, surveyQuestions, surveyAnswers) => {
  /**
   * input: an array of user responses
   * output: boolean indicating if all user responses are valid
   */
  const validAnswers = new Set(surveyAnswers.map((answer) => answer.value));

  const validQuestionIDs = new Set(
    surveyQuestions.map((question) => question.question_id)
  );

  if (validQuestionIDs.size !== responses.length) return false;

  for (const response of responses) {
    if (!validAnswers.has(response?.value)) return false;
    if (!validQuestionIDs.has(response?.question_id)) return false;
  }

  return true;
};

module.exports = { validateSurveyResponses };
