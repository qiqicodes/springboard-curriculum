const express = require("express");
const ExpressError = require("./expressError");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("App listening on 3000");
});
