const express = require("express");

const app = express();

// TODO: express error extends class ERROR

function convertStrToNum(input) {
  let result = [];
  for (let i = 0; i < input.length; i++) {
    let number = Number(input[i]);

    if (Number.isNaN(number)) {
      return new Error(`Invalid number: ${input[i]} at index: ${i}`);
    }
    result.push(number);
  }
  return result;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function findMean(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let mean = nums.reduce((acc, cur) => acc + cur) / nums.length;
  return isFloat(mean) ? mean.toFixed(2) : mean;
}

function findMedian(nums) {
  nums.sort((a,b) => a - b)

  let midIdx = Math.floor(nums.length/2);
  let median;
  if (nums.length % 2 === 0) {
    median = (nums[midIdx] + nums[midIdx + 1]) / 2;
  } else {
    median = nums[midIdx];
  }

  return isFloat(median) ? median.toFixed(2) : median;
}

function findMode(nums) {}

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
