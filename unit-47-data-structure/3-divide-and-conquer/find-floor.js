// Write a function called findFloor which accepts a sorted array and a value x,
// and returns the floor of x in the array.
// The floor of x in an array is the largest element in the array
// which is smaller than or equal to x.
// If the floor does not exist, return -1.

function findFloor(arr, x) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  if (x < arr[left]) return -1;
  if (x > arr[right]) return arr[right];

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] === x) return arr[mid];

    if (arr[mid] > x) {
      right = mid - 1;
      if (arr[right] <= x) {
        return arr[right];
      }
    }

    if (arr[mid] < x) {
      left = mid + 1;
      if (arr[left] > x) {
        return arr[mid];
      }
    }
  }
}

module.exports = findFloor;

findFloor([1, 2, 8, 10, 10, 12, 19], 9); // 8
findFloor([1, 2, 8, 10, 10, 12, 19], 20); // 19
findFloor([1, 2, 8, 10, 10, 12, 19], 0); // -1
