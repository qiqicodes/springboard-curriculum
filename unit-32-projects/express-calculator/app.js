const express = require("express");
const ExpressError = require("./expressError");
const {
  checkEmptyQueryObjectOrEmptyNumsList,
  convertStrToNum,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

const app = express();

app.get("/", (req, res) => {
  const result = `<h1>Hello, Dear! </h1>
  <p>Let's find your mean, median, and mode! <br>
  Please enter your numbers in the form of a comma-separated list in the URL. <br>
  <i>For example: 1,2,3,4,5,6,7,8,9,10</i>
  <br>=]
  <br><br>
  <b>Fill in your query like this: /mean?nums=1,2,3,4</b></p>`;

  res.format({
    "text/html": function () {
      res.send(result);
    },
  });
});

// DONE: GET routes
app.get("/mean", (req, res) => {
  checkEmptyQueryObjectOrEmptyNumsList(req.query);

  let result = {
    operation: "mean",
    value: findMean(convertStrToNum(req.query.nums)),
  };

  return res.send(result);
});

// DONE: GET routes
app.get("/median", (req, res) => {
  checkEmptyQueryObjectOrEmptyNumsList(req.query);

  let result = {
    operation: "median",
    value: findMedian(convertStrToNum(req.query.nums)),
  };

  return res.send(result);
});

// DONE: GET routes
app.get("/mode", (req, res) => {
  checkEmptyQueryObjectOrEmptyNumsList(req.query);

  let result = {
    operation: "mode",
    value: findMode(convertStrToNum(req.query.nums)),
  };

  return res.send(result);
});

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);

  return next(notFoundError);
});

app.use(function (err, req, res, next) {
  // generic error default to 500 server error

  let status = err.status || 500;
  let message = err.message || "Something went wrong";

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
