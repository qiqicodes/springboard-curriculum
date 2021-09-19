// Todo: test utility functions
const {
  checkEmptyQueryObjectOrEmptyNumsList,
  convertStrToNum,
  isFloat,
  findMean,
  findMedian,
  findMode,
} = require("./helpers");

describe("Check if the request object is empty", function () {
  it("throws error if object is empty", function () {
    expect(() => checkEmptyQueryObjectOrEmptyNumsList({})).toThrowError(Error);
    expect(() => checkEmptyQueryObjectOrEmptyNumsList({})).toThrowError(
      "Please pass in your query to nums with a list of numbers separated by comma"
    );
  });
  it("throws error if nums has no value", function () {
    expect(() =>
      checkEmptyQueryObjectOrEmptyNumsList({ nums: "" })
    ).toThrowError(Error);
    expect(() =>
      checkEmptyQueryObjectOrEmptyNumsList({ nums: "" })
    ).toThrowError(
      "Please pass in your query to nums with a list of numbers separated by comma"
    );
  });
});

describe("Check if the nums values are valid numbers", function () {
  it("throws error if first value that is not a number", function () {
    expect(() => convertStrToNum("1,2,2,foo,4")).toThrowError(Error);
    expect(() => convertStrToNum("1,2,2,foo,4")).toThrowError(
      "Invalid number: 'foo' is not a number. Please pass in your query to nums with a list of numbers separated by comma."
    );
  });
  it("throws error if first value that is an empty string", function () {
    expect(() => convertStrToNum("1,2,2,,4")).toThrowError(Error);
    expect(() => convertStrToNum("1,2,2,,4")).toThrowError(
      "Extra commas detected. Please pass in your query to nums with a list of numbers separated by comma."
    );
  });
  it("converting string to valid array of integers", function () {
    expect(convertStrToNum("1,2,2,3,4")).toEqual([1, 2, 2, 3, 4]);
    expect(convertStrToNum("1,2,3,3,4,-2,-3")).toEqual([
      1, 2, 3, 3, 4, -2, -3
    ]);
  });
});

describe("isFloat functionality", function () {
  it("validates a number if it is a float", function () {
    expect(isFloat(2)).toEqual(false);
    expect(isFloat(2.5)).toEqual(true);
  });
});

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
