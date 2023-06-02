const router = require("express").Router();
const survey = require("../../db/survey");

router.get("/", (req, res) => {
  console.log(survey);
  res.json(survey);
});

router.post("/", (req, res) => {
  res.json({ message: "hello from survery post route" });
});

module.exports = router;
