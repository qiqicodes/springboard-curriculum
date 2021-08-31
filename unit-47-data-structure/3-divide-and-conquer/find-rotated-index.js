// Write a function called findRotatedIndex which accepts a rotated array of sorted numbers
// and an integer. The function should return the index of num in the array.
// If the value is not found, return -1.

// Constraints:

// Time Complexity: O(log N)

function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  let zeroIndex = findPivot(arr);

  if (num > arr[left] && num > arr[right]) {
  }

  if (num < arr[left] && num < arr[right]) {
  }

  return -1;
}

function findPivot(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] < arr[left] && arr[mid] < arr[right]) {
      right = mid - 1;
      if (arr[right] > arr[mid]) {
        return mid;
      }
    } else if (arr[mid] > arr[left] && arr[mid] > arr[right]) {
      left = mid + 1;
      if (arr[left] < arr[mid]) {
        return left;
      }
    }
  }
}

module.exports = findRotatedIndex;

findRotatedIndex([3, 4, 1, 2], 4); //1)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8); //2)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3); //6)
findRotatedIndex([37, 44, 66, 102, 10, 22], 14); //-1)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12); //-1)
