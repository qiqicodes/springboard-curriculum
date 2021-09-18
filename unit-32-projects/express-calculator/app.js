const express = require("express");
const app = express();

const ExpressError = require("./expressError");
const {
  convertStrToNum,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

// TODO: GET routes

app.get("/mean", (req, res, next) => {
  console.log(req.query.nums);
  nums = req.query.nums.split(",");
  console.log(nums);
  let result = { operation: "mean", value: findMean(convertStrToNum(nums)) };

  return res.send(result);
});

// TODO:
app.get("/median", (req, res, next) => {});

// TODO:
app.get("/mode", (req, res, next) => {});

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
