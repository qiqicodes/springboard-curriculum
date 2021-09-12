/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0) return 1;

  return nums[0] * product(nums.slice(1));
}

product([2, 3, 4]); //24
product([1, -1, 1, -1, 1, -1]); //-1
product([10]); //10

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 1) return words[0].length;

  return Math.max(words[0].length, longest(words.slice(1)));
}
longest(["hello", "hi", "hola"]); //5
longest(["abcdefg", "hijklmnop", "qrs", "tuv", "wx", "y", "z"]); //9
longest(["a", "b", "c", "d", "e"]); //1
longest(["abcde"]); //5

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 2) return str[0];

  return str[0] + everyOther(str.slice(2));
}
everyOther("hello"); //"hlo"
everyOther("banana stand"); //"bnn tn"
everyOther("ddoouubbllee"); //"double"
everyOther("hi"); //"h"
everyOther("z"); //"z"

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, index = 0) {
  let leftIdx = index;
  let rightIdx = str.length - index - 1;

  if (leftIdx >= rightIdx) return true;
  if (str[leftIdx] !== str[rightIdx]) return false;

  return isPalindrome(str, index + 1);
}
isPalindrome("tacocat"); //true
isPalindrome("racecar"); //true
isPalindrome("a"); //true
isPalindrome("helloolleh"); //true
isPalindrome("tacodog"); //false
isPalindrome("az"); //false
isPalindrome("goodbye"); //false

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index = 0) {
  if (index === arr.length) return -1;
  if (arr[index] === val) return index;

  return findIndex(arr, val, index + 1);
}

findIndex(["duck", "cat", "pony", "cat"], "duck"); //0
findIndex(["duck", "cat", "pony", "cat"], "cat"); //1
findIndex(["duck", "cat", "pony", "cat"], "pony"); //2
findIndex(["duck", "cat", "pony", "cat"], "porcupine"); //-1
findIndex(["duck", "cat", "pony", "cat"], "turtle"); //-1

/** revString: return a copy of a string, but in reverse. */

function revString(str, index = 0, newStr = "") {
  if (index === str.length) return newStr;
  newStr += str[str.length - index - 1];

  return revString(str, index + 1, newStr);
}

revString("porcupine"); // "enipucrop"
revString("duck"); //"kcud"
revString("cat"); //"tac"
revString("pony"); //"ynop"

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  const arr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      arr.push(obj[key]);
    }
    if (typeof obj[key] === "object") {
      arr.push(...gatherStrings(obj[key]));
    }
  }
  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, leftIdx = 0, rightIdx = arr.length - 1) {
  if (leftIdx > rightIdx) return -1;

  let mid = Math.floor((leftIdx + rightIdx) / 2);

  if (arr[mid] === val) return mid;

  if (arr[mid] > val) return binarySearch(arr, val, leftIdx, mid - 1);

  return binarySearch(arr, val, mid + 1, rightIdx);
}

binarySearch([1, 2, 3, 4], 4); //3
binarySearch([1, 2], 1); //0
binarySearch([1, 2, 3, 4, 5, 6, 7], 6); //5
binarySearch([1, 2, 3, 4], 0); //-1
binarySearch([1, 2], 11); //-1

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
