const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // Serve the client's index.html file at the root route
  router.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });

  // Serve the static assets in the client's build folder
  router.use(express.static(path.resolve("../client/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
}

module.exports = router;
