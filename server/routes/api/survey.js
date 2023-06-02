const router = require("express").Router();
const survey = require("../../db/survey");
const { validateSurvey } = require("../../utils/surveys/middleware");

router.get("/", (_req, res) => {
  res.json(survey);
});

router.post("/", validateSurvey, (req, res) => {
  res.json({ message: "hello from survery post route" });
});

module.exports = router;
