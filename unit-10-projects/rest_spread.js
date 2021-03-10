/*Rest / Spread Operator Exercises
In this exercise, you’ll refactor some ES5 code into ES2015.
*/

// 1. Given this function:
function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}

// Refactor it to use the rest operator & an arrow function:
/* Write an ES2015 Version */

const filterOutOdds = (...nums) => {nums.filter(num => num % 2 === 0)};



/*
2. findMin
Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.

Make sure to do this using the rest and spread operator.

findMin(1,4,12,-3) // -3
findMin(1,-1) // -1
findMin(3,1) // 1
*/

/* Write an ES2015 Version */
const findMin = (...nums) => Math.min(...nums);


/*
3. mergeObjects
Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}
*/

const mergeObjects = (obj1, obj2) => ({...obj1,...obj2}); 


/*
4. doubleAndReturnArgs
Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.

doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
doubleAndReturnArgs([2],10,4) // [2, 20, 8]
*/

/* Write an ES2015 Version */
const doubleAndReturnArgs = (arr, ...args) => [...arr, args.map(v => v * 2)];

/*
5. Slice and Dice!
For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!

Make sure that you are always returning a new array or object and not modifying the existing inputs.
*/

/** 5.1. remove a random element in the items array
and return a new array without that item. */

// function removeRandom(items) {}

/* Write an ES2015 Version */
const removeRandom = (items) => {
    let idx = Math.floor(Math.random() * items.length);
//     return [...items.splice(idx,1)]; // < returns the removed item.
        return [...items.slice(0,idx), ...items.slice(idx + 1)]; // < [arr before the removed item, arr after the removed item]
};

/** 5.2. Return a new array with every item in array1 and array2. */

// function extend(array1, array2) {}

/* Write an ES2015 Version */
const extend = (array1, array2) => [...array1, ...array2]; 


/** 5.3. Return a new object with all the keys and values
from obj and a new key/value pair */

// function addKeyVal(obj, key, val) {}

/* Write an ES2015 Version */
const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val});


/** 5.4. Return a new object with a key removed. */

// function removeKey(obj, key) {}

/* Write an ES2015 Version */
const removeKey = (obj, key) => {
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
};

/** 5.5. Combine two objects and return a new object. */

// function combine(obj1, obj2) {}

/* Write an ES2015 Version */
const combine = (obj1, obj2) => ({...obj1, ...obj2});

/** 5.6. Return a new object with a modified key and value. */

function update(obj, key, val) {}

/* Write an ES2015 Version */
const update = (obj, key, val) => ({...obj, [key]: val}); 