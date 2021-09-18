const express = require("express");
const app = express();

const ExpressError = require("./expressError");
const {
  convertStrToNum,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

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

// TODO: GET routes
app.get("/mean", (req, res, next) => {
  // Todo: handle error
  console.log("#######################", req.query);
  if (Object.keys(req.query).length === 0 || !req.query.nums) {
    throw new ExpressError(
      "Please pass in your query to nums with a list of numbers separated by comma"
    );
  }

  let result = {
    operation: "mean",
    value: findMean(convertStrToNum(req.query.nums)),
  };

  return res.send(result);
});

// TODO: GET routes
app.get("/median", (req, res, next) => {
  // Todo: handle error
});

// TODO: GET routes
app.get("/mode", (req, res, next) => {
  // Todo: handle error
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
