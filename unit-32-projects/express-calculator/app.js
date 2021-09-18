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
  const result = `Hello, Dear! 
  Let's find your mean, median, and mode!
  Please enter your numbers in the form of a comma-separated list in the URL.
  For example: 1,2,3,4,5,6,7,8,9,10
  =]

  Fill in your query like this: /mean?nums=1,2,3,4`;

  res.send(result);
});

// TODO: GET routes
app.get("/mean", (req, res, next) => {
  // Todo: handle error
  // if (!req.query.nums)
  //   return new ExpressError(
  //     "Please pass in your query to nums with a list of numbers separated by comma"
  //   );

  console.log(req);
  console.log(req.query.nums);
  nums = req.query.nums.split(",");
  console.log(nums);
  let result = { operation: "mean", value: findMean(convertStrToNum(nums)) };

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
