// Write a function called findRotationCount which accepts an array of distinct numbers
// sorted in increasing order. The array has been rotated counter-clockwise n number of times.
// Given such an array, find the value of n.

// Constraints:

// Time Complexity: O(log N)

function findRotationCount(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  if (arr[right] > arr[left]) return 0;
  if (arr[left] > arr[left + 1]) return left + 1;
  if (arr[right] < arr[right - 1]) return right;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] > arr[left]) {
      left = mid + 1;
      if (arr[left] > arr[mid]) {
        return left;
      }
    }

    if (arr[mid] < arr[left] && arr[mid] < arr[right]) {
      right = mid - 1;
      if (arr[right] > arr[mid]) {
        return mid;
      }
    }
  }
}

module.exports = findRotationCount;

findRotationCount([15, 18, 2, 3, 6, 12]); //2
findRotationCount([7, 9, 11, 12, 5]); //4
findRotationCount([7, 9, 11, 12, 15]); //0
