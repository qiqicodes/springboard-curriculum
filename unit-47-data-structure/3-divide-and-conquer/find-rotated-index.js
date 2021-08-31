// Write a function called findRotatedIndex which accepts a rotated array of sorted numbers
// and an integer. The function should return the index of num in the array.
// If the value is not found, return -1.

// Constraints:

// Time Complexity: O(log N)

function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  if (arr[0] === num) return 0;
  if (arr[arr.length - 1] === num) return arr.length - 1;

  let zeroIndex = findPivot(arr);
  if (arr[zeroIndex] === num) return zeroIndex;
  if (arr[zeroIndex - 1] === num) return zeroIndex - 1;

  if (num > arr[left] && num < arr[zeroIndex - 1]) {
    right = zeroIndex - 1;
    return binarySearch(arr, left, right, num);
  }

  if (num > arr[zeroIndex] && num < arr[right]) {
    left = zeroIndex;
    return binarySearch(arr, left, right, num);
  }

  return -1;
}

function findPivot(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] < arr[right]) {
      right = mid - 1;
      if (arr[right] > arr[mid]) {
        return mid;
      }
    } else if (arr[mid] > arr[left]) {
      left = mid + 1;
      if (arr[left] < arr[mid]) {
        return left;
      }
    }
  }
}

function binarySearch(arr, left, right, num) {
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] > num) {
      right = mid - 1;
      if (arr[right] === num) {
        return right;
      }
    } else if (arr[mid] < num) {
      left = mid + 1;
      if (arr[left] === num) {
        return left;
      }
    } else {
      return mid;
    }
  }
  return -1;
}

module.exports = findRotatedIndex;

findRotatedIndex([3, 4, 1, 2], 4); //1)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8); //2)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3); //6)
findRotatedIndex([37, 44, 66, 102, 10, 22], 14); //-1)
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12); //-1)
