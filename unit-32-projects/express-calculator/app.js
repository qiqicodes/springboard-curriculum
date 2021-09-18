const express = require("express");
const app = express();

const 

// TODO: express error extends class ERROR

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

app.listen(3000, () => {
  console.log("App on port 3000");
});
