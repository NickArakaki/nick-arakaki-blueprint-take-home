const router = require("express").Router();
const survey = require("../../db/survey");
const {
  validateSurvey,
  processSurvey,
} = require("../../utils/surveys/middleware");

router.get("/", (_req, res) => {
  return res.json(survey);
});

router.post("/", validateSurvey, processSurvey, (req, res) => {
  return res.json(req.results);
});

module.exports = router;
