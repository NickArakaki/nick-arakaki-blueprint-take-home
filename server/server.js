const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(routes);

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
