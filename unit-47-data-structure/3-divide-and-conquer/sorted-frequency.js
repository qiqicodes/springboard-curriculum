// Given a sorted array and a number, write a function called sortedFrequency
// that counts the occurrences of the number in the array

// Constraints:

// Time Complexity: O(log N)

function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let mid, somewhereMiddleRef, rightRef, leftRef;
  let count = 0;

  if (arr[left] > num || arr[right] < num) {
    return -1;
  }

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] !== num) {
      arr[mid] > num ? (right = mid - 1) : (left = mid + 1);
    } else {
      somewhereMiddleRef = mid;
      break;
    }
  }
  console.log(somewhereMiddleRef, "somewhereMiddleRef");

  left = somewhereMiddleRef;
  right = arr.length - 1;
  while (left <= right) {
    if (arr[arr.length - 1] === num) {
      rightRef = arr.length - 1;
      break;
    }
    mid = Math.floor((left + right) / 2);
    if (arr[mid] !== num) {
      right = mid - 1;
      if (arr[right] === num) {
        rightRef = right;
        break;
      }
    } else {
      left = mid + 1;
      if (arr[left] !== num) {
        rightRef = mid;
        break;
      }
    }
  }
  console.log(rightRef, "rightRef");

  left = 0;
  right = somewhereMiddleRef;
  while (left <= right) {
    if (arr[0] === num) {
      leftRef = 0;
      break;
    }
    mid = Math.floor((left + right) / 2);
    if (arr[mid] !== num) {
      left = mid + 1;
      if (arr[left] === num) {
        true;
        leftRef = left;
        break;
      }
    } else {
      right = mid - 1;
      if (arr[right] === num) {
        leftRef = mid;
        break;
      }
    }
  }
  console.log(leftRef, "leftRef");

  count = rightRef - leftRef + 1;

  return count;
}

module.exports = sortedFrequency;

// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2); //4
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3); //1
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1); //2
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4); //-1
