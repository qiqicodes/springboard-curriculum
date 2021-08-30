// Given an array of 1s and 0s which has all 1s first followed by all 0s,
// write a function called countZeroes, which returns the number of zeroes in the array.

// Constraints:
// Time Complexity: O(log N)

function countZeroes(arr) {
  // [1,1,1,1,0,0]
  let left = 0;
  let right = arr.length - 1; //5
  let mid;
  let numZeroes = 0;

  if (arr[left] === 0) {
    numZeroes = arr.length;
  }

  while (left <= right) {
    //3<=5
    mid = Math.floor((left + right) / 2); //4
    if (arr[mid] === 0) {
      //0
      right = mid - 1; //3
      if (arr[right] === 1) {
        //t
        numZeroes = arr.length - mid;
      }
    } else {
      //1
      left = mid + 1; //3
      if (arr[left] === 0) {
        numZeroes = arr.length - left;
      }
    }
  }
  return numZeroes;
}

module.exports = countZeroes;

// countZeroes([1, 1, 1, 1, 0, 0]); // 2
// countZeroes([1, 0, 0, 0, 0]); // 4
// countZeroes([0, 0, 0]); // 3
// countZeroes([1, 1, 1, 1]); //0
