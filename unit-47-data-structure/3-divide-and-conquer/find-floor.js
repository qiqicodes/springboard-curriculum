// Write a function called findFloor which accepts a sorted array and a value x,
// and returns the floor of x in the array.
// The floor of x in an array is the largest element in the array
// which is smaller than or equal to x.
// If the floor does not exist, return -1.

function findFloor(arr, num) {}

module.exports = findFloor;

findFloor([1, 2, 8, 10, 10, 12, 19], 5); // 2
findFloor([1, 2, 8, 10, 10, 12, 19], 20); // 19
findFloor([1, 2, 8, 10, 10, 12, 19], 0); // -1
