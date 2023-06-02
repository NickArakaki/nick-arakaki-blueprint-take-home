const router = require("express").Router();
const survey = require("../../db/survey");

router.get("/", (_req, res) => {
  res.json(survey);
});

router.post("/", (req, res) => {
  res.json({ message: "hello from survery post route" });
});

module.exports = router;
