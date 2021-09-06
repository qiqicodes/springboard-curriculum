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

function isPalindrome(str) {}
isPalindrome("tacocat"); //true
isPalindrome("racecar"); //true
isPalindrome("a"); //true
isPalindrome("helloolleh"); //true
isPalindrome("tacodog"); //false
isPalindrome("az"); //false
isPalindrome("goodbye"); //false

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {}
findIndex(animals, "duck"); //0
findIndex(animals, "cat"); //1
findIndex(animals, "pony"); //2
findIndex(animals, "porcupine"); //-1
findIndex(animals, "turtle"); //-1

/** revString: return a copy of a string, but in reverse. */

function revString(str) {}

revString("porcupine"); // "enipucrop"
revString("duck"); //"kcud"
revString("cat"); //"tac"
revString("pony"); //"ynop"

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {}

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
