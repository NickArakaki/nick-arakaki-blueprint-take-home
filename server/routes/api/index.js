const surveyRouter = require("./survey");
const router = require("express").Router();

router.use("/survey", surveyRouter);

module.exports = router;
