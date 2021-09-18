const express = require("express");

const app = express();

// TODO: express error extends class ERROR

app.get("/mean", (req, res) => {
  console.log(req.query.nums);
  nums = req.query.nums.split(",");
  console.log(nums);
  let result = { operation: "mean", value: findMean(convertStrToNum(nums)) };

  return res.send(result);
});

// TODO:
app.get("/median", (req, res) => {});
// TODO:
app.get("/mode", (req, res) => {});

app.listen(3000, () => {
  console.log("App on port 3000");
});
