const survey = require("../../db/survey");
const { validateSurveyResponses } = require("../../utils/surveys/validators");

describe("Survey Screen Validators", () => {
  const surveyQuestions = survey.content.sections[0].questions;
  const surveyAnswers = survey.content.sections[0].answers;

  test("should return true", () => {
    responses = [
      {
        value: 1,
        question_id: "question_a",
      },
      {
        value: 0,
        question_id: "question_b",
      },
      {
        value: 2,
        question_id: "question_c",
      },
      {
        value: 3,
        question_id: "question_d",
      },
      {
        value: 1,
        question_id: "question_e",
      },
      {
        value: 0,
        question_id: "question_f",
      },
      {
        value: 1,
        question_id: "question_g",
      },
      {
        value: 0,
        question_id: "question_h",
      },
    ];
    expect(
      validateSurveyResponses(responses, surveyQuestions, surveyAnswers)
    ).toBe(true);
  });
  test("should return false", () => {
    responses = [
      {
        value: -1,
        question_id: "question_a",
      },
      {
        value: 0,
        question_id: "question_b",
      },
      {
        value: 2,
        question_id: "question_c",
      },
      {
        value: 3,
        question_id: "question_d",
      },
      {
        value: 1,
        question_id: "question_e",
      },
      {
        value: 0,
        question_id: "question_f",
      },
      {
        value: 1,
        question_id: "question_g",
      },
      {
        value: 0,
        question_id: "question_h",
      },
    ];
    expect(
      validateSurveyResponses(responses, surveyQuestions, surveyAnswers)
    ).toBe(false);
  });

  test("should return false", () => {
    responses = [
      {
        question_id: "question_a",
      },
      {
        value: 0,
        question_id: "question_b",
      },
      {
        value: 2,
        question_id: "question_c",
      },
      {
        value: 3,
        question_id: "question_d",
      },
      {
        value: 1,
        question_id: "question_e",
      },
      {
        value: 0,
        question_id: "question_f",
      },
      {
        value: 1,
        question_id: "question_g",
      },
      {
        value: 0,
        question_id: "question_h",
      },
    ];
    expect(
      validateSurveyResponses(responses, surveyQuestions, surveyAnswers)
    ).toBe(false);
  });

  test("should return false", () => {
    responses = [];
    expect(
      validateSurveyResponses(responses, surveyQuestions, surveyAnswers)
    ).toBe(false);
  });
});
