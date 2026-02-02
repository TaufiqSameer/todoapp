const express = require("express");
const handleit = require("./routing");
const bodyParser = require("body-parser");

const routes = require("../Expressing/routing/routes");

const app = express();

app.use(express.urlencoded());
app.use(routes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
