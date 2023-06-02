const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "hello from survey router" });
});

router.post("/", (req, res) => {
  res.json({ message: "hello from survery post route" });
});

module.exports = router;
