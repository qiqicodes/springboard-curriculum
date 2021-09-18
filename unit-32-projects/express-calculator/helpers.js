function convertStrToNum(input) {
  const result = [];
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

  const mean = nums.reduce((acc, cur) => acc + cur) / nums.length;
  return isFloat(mean) ? mean.toFixed(2) : mean;
}

function findMedian(nums) {
  if (nums.length === 0) {
    return 0;
  }

  nums.sort((a, b) => a - b);

  let midIdx = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[midIdx] + nums[midIdx + 1]) / 2;
  } else {
    median = nums[midIdx];
  }

  return isFloat(median) ? median.toFixed(2) : median;
}

function findMode(nums) {
  if (nums.length === 0) {
    return 0;
  }

  const modeObj = {};

  for (i = 0; i < nums.length; i++) {
    modeObj.hasOwnProperty(nums[i])
      ? modeObj[nums[i]]++
      : (modeObj[nums[i]] = 1);
  }

  const iterator = Object.values(modeObj);
  let max = Math.max(...iterator);
  const modeIdx = [];

  for (let i = 0; i < iterator.length; i++) {
    if (iterator[i] === max) {
      modeIdx.push(i);
    }

    if (modeIdx.length === iterator.length) return 0;
  }

  const iterator2 = Object.keys(modeObj);
  if (modeIdx.length === 1) {
    return iterator2[modeIdx];
  } else {
    let result = iterator2[modeIdx[0]];
    for (let i = 1; i < modeIdx.length; i++) {
      result += `, ${iterator2[modeIdx[i]]}`;
    }

    return result;
  }
}

module.exports = {
  convertStrToNum,
  findMean,
  findMedian,
  findMode,
};
