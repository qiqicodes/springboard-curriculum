// let and const Exercise
// In this exercise, you’ll refactor some ES5 code into ES2015.

// ES5 Global Constants
var PI = 3.14;
PI = 42; // stop me from doing this!

// ES2015 Global Constants
/* Write an ES2015 Version */
const PI = 3.14;


// Quiz
// What is the difference between var and let?
/* 
1. Both var and let are reassignable. Var is redeclarable, let is not redeclarable.
2. var variable is accessible from all scope, both global and local scopes. 
When var is declared anywhere on the page, hoisting mechanism pulls the var variable to the top as undefined.
let variable is only accessible in the block scope, unless declared and assigned outside of the block scope.
So when calling the function with the let variable declared later than the function, there will be a typeError.
*/

// What is the difference between var and const?
/* 
1. var is redeclarable and reassignable; 
const is not redeclarable, const is not reassignable and not mutatable for primitive values.
const is not reassignable, but it is mutatable for arrays and objects.
2. var variable is accessible from all scope, both global and local scopes. 
const is only accessible in the block scope, unless declared and assigned outside of the block scope.
like let variable, if calling function is prior the const variable then return typeError.
*/

// What is the difference between let and const?
/*
Both let and const are not redeclarable. let is reassignable. const is not reassignable.
When declaring const and assigning the variable to arrays or objects, then the properties can be mutatable.
*/

// What is hoisting?
/* 
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. 

*/