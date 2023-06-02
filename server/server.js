const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(routes);

// 404 Catch
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resouce couldn't be found"];
  err.status = 404;
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    message: err.message,
    statusCode: err.status || 500,
    errors: err.errors,
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
