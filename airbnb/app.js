const path = require("path");


const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { hostRoutes } = require("./routes/hostRoutes");
const root = require("./utils/pathHelper");

app.set("view engine", "ejs");
app.use(express.static(path.join(root, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.redirect("/store/");
});

app.use("/store", userRoutes);
app.use("/host", hostRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    currentPage: "404"
  });
});
const port = 8000;

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
