const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(express.urlencoded());
router.get("/", (req, res, next) => {
  console.log("first", req.url, req.method);
  res.write("<h1>Welcome to the Calculator app");
  res.write('<a href="/calculator">Click here</a>');
});
// router.get("/", (req, res, next) => {
//   console.log("second", req.url, req.method);
//   res.send("<h2>done2</h2>")
// });
router.get("/contact-us", (req, res, next) => {
  console.log("second", req.url, req.method);
  res.send(`
      <h1>PLease contact us </h1>
      <form action="contact-us" method="POST">
      <label for="email">Email:</label>
      <input type="text" name="email" placeholder="Enter your email"/>
      <input type="submit"/>
      `);
});
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/contact-us", (req, res) => {
  res.send(`
      <h1>Please contact us</h1>
      <form action="/contact-us" method="POST">
        <label>Email:</label>
        <input type="text" name="email" />
        <input type="submit" />
      </form>
    `);
    console.log(req.body);
});

router.post("/contact-us", (req, res) => {
  console.log("post", req.body, req.url);
  res.send("<h1>done posting</h1>");
});

module.exports = router;
