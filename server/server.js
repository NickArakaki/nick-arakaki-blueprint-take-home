const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
