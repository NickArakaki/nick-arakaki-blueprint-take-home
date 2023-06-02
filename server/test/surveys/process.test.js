const {
  processSurveyResponses,
  processDomainValues,
} = require("../../utils/surveys/process");

describe("Process Surver Responses", () => {
  test("should equal { depression: 0, mania: 0, anxiety: 0, substance_use: 0 }", () => {
    responses = [
      { question_id: "question_a", value: 0 },
      { question_id: "question_b", value: 0 },
      { question_id: "question_c", value: 0 },
      { question_id: "question_d", value: 0 },
      { question_id: "question_e", value: 0 },
      { question_id: "question_f", value: 0 },
      { question_id: "question_g", value: 0 },
      { question_id: "question_h", value: 0 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 0,
      mania: 0,
      anxiety: 0,
      substance_use: 0,
    });
  });
  test("should equal { depression: 8, mania: 8, anxiety: 12, substance_use: 4 }", () => {
    responses = [
      { question_id: "question_a", value: 4 },
      { question_id: "question_b", value: 4 },
      { question_id: "question_c", value: 4 },
      { question_id: "question_d", value: 4 },
      { question_id: "question_e", value: 4 },
      { question_id: "question_f", value: 4 },
      { question_id: "question_g", value: 4 },
      { question_id: "question_h", value: 4 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 8,
      mania: 8,
      anxiety: 12,
      substance_use: 4,
    });
  });
  test("should equal { depression: 3, mania: 7, anxiety: 6, substance_use: 4 }", () => {
    responses = [
      { question_id: "question_a", value: 1 },
      { question_id: "question_b", value: 2 },
      { question_id: "question_c", value: 3 },
      { question_id: "question_d", value: 4 },
      { question_id: "question_e", value: 1 },
      { question_id: "question_f", value: 2 },
      { question_id: "question_g", value: 3 },
      { question_id: "question_h", value: 4 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 3,
      mania: 7,
      anxiety: 6,
      substance_use: 4,
    });
  });
  test("should equal { depression: 0, mania: 0, anxiety: 0, substance_use: 1 }", () => {
    responses = [
      { question_id: "question_a", value: 0 },
      { question_id: "question_b", value: 0 },
      { question_id: "question_c", value: 0 },
      { question_id: "question_d", value: 0 },
      { question_id: "question_e", value: 0 },
      { question_id: "question_f", value: 0 },
      { question_id: "question_g", value: 0 },
      { question_id: "question_h", value: 1 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 0,
      mania: 0,
      anxiety: 0,
      substance_use: 1,
    });
  });

  test("should equal { depression: 2, mania: 0, anxiety: 0, substance_use: 0 }", () => {
    responses = [
      { question_id: "question_a", value: 1 },
      { question_id: "question_b", value: 1 },
      { question_id: "question_c", value: 0 },
      { question_id: "question_d", value: 0 },
      { question_id: "question_e", value: 0 },
      { question_id: "question_f", value: 0 },
      { question_id: "question_g", value: 0 },
      { question_id: "question_h", value: 0 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 2,
      mania: 0,
      anxiety: 0,
      substance_use: 0,
    });
  });

  test("should equal { depression: 0, mania: 2, anxiety: 0, substance_use: 0 }", () => {
    responses = [
      { question_id: "question_a", value: 0 },
      { question_id: "question_b", value: 0 },
      { question_id: "question_c", value: 1 },
      { question_id: "question_d", value: 1 },
      { question_id: "question_e", value: 0 },
      { question_id: "question_f", value: 0 },
      { question_id: "question_g", value: 0 },
      { question_id: "question_h", value: 0 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 0,
      mania: 2,
      anxiety: 0,
      substance_use: 0,
    });
  });

  test("should equal { depression: 0, mania: 0, anxiety: 3, substance_use: 0 ", () => {
    responses = [
      { question_id: "question_a", value: 0 },
      { question_id: "question_b", value: 0 },
      { question_id: "question_c", value: 0 },
      { question_id: "question_d", value: 0 },
      { question_id: "question_e", value: 1 },
      { question_id: "question_f", value: 1 },
      { question_id: "question_g", value: 1 },
      { question_id: "question_h", value: 0 },
    ];
    expect(processSurveyResponses(responses)).toEqual({
      depression: 0,
      mania: 0,
      anxiety: 3,
      substance_use: 0,
    });
  });
});

describe("Process Domain Values", () => {
  test("should return ['PHQ-9', 'ASRM', 'ASSIST']", () => {
    expect(
      processValues({ depression: 2, mania: 4, anxiety: 3, substance_use: 3 })
    ).toEqual(["PHQ-9", "ASRM", "ASSIST"]);
  });

  test("should return tests ['PHQ-9']", () => {
    expect(processValues({ depression: 2, mania: 0, anxiety: 3 })).toEqual([
      "PHQ-9",
    ]);
  });

  test("should return []", () => {
    expect(
      processValues({ depression: 0, mania: 0, anxiety: 0, substance_use: 0 })
    ).toEqual([]);
  });

  test("should return []", () => {
    expect(processValues({})).toEqual([]);
  });
});
