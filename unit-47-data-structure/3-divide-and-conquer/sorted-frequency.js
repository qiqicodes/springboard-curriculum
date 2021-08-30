// Given a sorted array and a number, write a function called sortedFrequency
// that counts the occurrences of the number in the array

// Constraints:

// Time Complexity: O(log N)

function sortedFrequency(arr, num) {
  //1, 1, 2, 2, 2, 2, 3], 2
  let left = 0;
  let right = arr.length - 1; //6
  let mid, somewhereMiddleRef, rightRef, leftRef;
  let count = 0;

  if (arr[left] > num || arr[right] < num) {
    return -1;
  }

  // find somewhere in the middle
  while (left <= right) {
    // 0<=6
    mid = Math.floor((left + right) / 2); // 3

    if (arr[mid] !== num) {
      //2
      arr[mid] > num ? (right = mid - 1) : (left = mid + 1);
    } else {
      somewhereMiddleRef = mid; //2
      break;
    }
  }
  console.log(somewhereMiddleRef, "somewhereMiddleRef");
  // right side
  left = somewhereMiddleRef; //2
  right = arr.length - 1; //6
  while (left <= right) {
    // 2<=6 5<=6

    if (arr[arr.length - 1] === num) {
      rightRef = arr.length - 1;
      break;
    }
    mid = Math.floor((left + right) / 2); //4 5
    if (arr[mid] !== num) {
      //2
      right = mid - 1;
      if (arr[right] === num) {
        rightRef = right;
        break;
      }
    } else {
      //2
      left = mid + 1; //5 6
      if (arr[left] !== num) {
        rightRef = mid; //5
        break;
      }
    }
  }
  console.log(rightRef, "rightRef");
  //left side
  left = 0;
  right = somewhereMiddleRef; //2
  while (left <= right) {
    //0<=2
    if (arr[0] === num) {
      leftRef = 0;
      break;
    }
    mid = Math.floor((left + right) / 2); //1
    if (arr[mid] !== num) {
      //true
      left = mid + 1; //2
      if (arr[left] === num) {
        true;
        leftRef = left; //2
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

  count = rightRef - leftRef + 1; //5-2+1 = 4

  return count;
}

module.exports = sortedFrequency;

// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2); //4
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3); //1
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1); //2
// sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4); //-1

// [1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3], 2 //12

//  L              m0                 R
// 0               5                  11

// m1 = 8                    m1

// while(l<=r)
//     m0 = L+R/2

//     arr[m0] !== val
//         arr[m0] > val
//             R = m0-1
//         arr[m0] < val
//             L = m0+1

//     arr[m0] === val
//         somewhereMiddleRef = mid

//         // right side
//         L= ref
//         R = arr.length -1
//         while( L <= R ){
//             mid = L+R/2
//             if(arr[mid] !== val){
//                 R = mid-1
//                 if ( arr[R] === val) {
//                     rightRef = R;
//                     break;
//                 }
//             } else {
//                 L = mid+1
//                 if (arr[L] !== val){
//                     rightRef = mid
//                     break;
//                 }
//             }
//         }

//         //left side
//         L = 0
//         R = ref
//         while( L <= R ){
//             mid = L+R/2
//             if(arr[mid] !== val){
//                 L = mid+1
//                 if (arr[L] === val){
//                     leftRef = L
//                     break;
//                 }
//             } else {
//                 R = mid-1
//                 if ( arr[R] === val) {
//                     leftRef = mid;
//                     break;
//                 }
//             }
//         }
