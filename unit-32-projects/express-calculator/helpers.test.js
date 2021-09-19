// Todo: test utility functions
const {
  checkEmptyQueryObjectOrEmptyNumsList,
  convertStrToNum,
  isFloat,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

describe("findMean functionality", function () {
  it("finds the mean of an empty array", function () {
    expect(findMean([])).toEqual("0");
  });
  it("finds the mean of an array of numbers", function () {
    expect(findMean([1, 2, 3, 4, -2])).toEqual("1.60");
  });
});

describe("findMedian functionality", function () {
  it("finds the median of an even set", function () {
    expect(findMedian([1, 2, 3, 4, -2])).toEqual("2");
  });
  it("finds the median of an odd set", function () {
    expect(findMedian([1, 2, 3])).toEqual("2");
  });
});

describe("findMode functionality", function () {
  it("finds no mode", function () {
    expect(findMode([1, 1, 2, 2, 3, 3])).toEqual("0");
  });
  it("finds one mode", function () {
    expect(findMode([1, 1, 1, 2, 2, 3, 3])).toEqual("1");
  });
  it("finds more than one mode", function () {
    expect(findMode([1, 1, 1, 2, 2, 2, 3, 3])).toEqual("1, 2");
  });
});
