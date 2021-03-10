

// argument object, is not an array. it does have idx and length prop. but nothing else
function max(a,b,c,d,e,f,g,h){

}

function max() {
    console.log(arguments)
}

// following doesn't work, because argument object is not an array. it does have idx and length prop. 
function sum(){
    arguments.reduce((sum, val) =>{
        return sum + val;
    })
}

// turn array-like-obj into an array, 
// by making a copy of an array and 
// setting the target of the copy to be the arguments array-like-obj

// Old way - [].slice.call()
function doubleArgs(){
    let arrayFromArguments = [].slice.call(arguments);
    return arrayFromArguments.map(arg => arg *2);
}

doubleArgs(1,2) // [2, 4]

// nicer way - Array.from() 
function sum(){
    // console.log(Array.from(arguements)); // >sume(3,4,5) >(3) [3,4,5]
    const args = Array.from(arguments);
    return args.reduce((sum, val) =>{
        return sum + val;
    })
}

// // problem is arrow function, ReferenceError: arguments not defined
// const max = () => {
//     console.log(arguments);
// };

// // to solve this problem we can use rest operator, we first turn the arrow function back to normal function
const max = function() {
    const args = Array.from(arguments);
    return args.reduce((max, currVal) => {
        return currVal > max ? currVal : max;
    }); // we can set the second parameter to account for edge cases, set to 0, [] or {}
}

// rest operator. turns array-like-obj to an array
// this rest operator collects everything
function sum(...nums) {
    return nums.reduce((sum, n) => sum + n);
}


const sumAll = (...val) => {
    // set for edge cases:
    if (!val.length) return undefined;
    return val.reduce((sum,n) => sum + n);
}


// makeFamily('cindy', 'peter','adam','ann')
// return an obj
// {
//     parent1: 'cindy',
//     parent2: 'peter',
//     children: ['adam','ann'] // if no children set to undefined
// }

// set a rest operator to collect the rest of the arguments
function makeFamily (parent1,parent2,...children) {
    // console.log(parent1, parent2); //return value
    // console.log(children); //return an empty array or array with value
    return {
        parents: [parent1, parent2],
        children: children.length ? children : 0
    }
} 


// filterByType('number', 1, 2, 3, 'a', true)
// filterByType(Number)
// return 
// [1, 2, 3] 
// filterByType(Boolean)
// return 
// [true] 

const filterByType = (type, ...values) => {
    return values.filter(val => typeof val === type);
}

// error to put another paramenter after the rest operator 
// function printStuff(a, ...rest, b) will throw error



// spread operator
// 
// if you put an array in a function like Math.max
// it tries to find the max of an array and nothing else, so it returns NaN
// when iterating through the array, and check each number of the array,
// use ... to spread the array when calling the function
// Math.max(...array)

// spread operator can also spread a string into separate el.


//Spreading Objects
//object is not iterable, so what do we do? 
const tea = {
    type: 'oolong',
    name: 'winter sprout',
    origin: 'taiwan'
};

//const arr = [... tea]; // returns TypeError, because it is not iterable

const tea2 = {... tea} // make copy of an object 

const teaTin = {...tea, price: 23};

//tea with different name

const newTea = {...tea, name: 'golden frost'}; 
//order matters when putting new key and values to new obj

// spread array to an obj

// const colors = ['red', 'orange', 'blue'];
// const dummyObj = {...colors}; 
// return {
//     0: 'red',
//     1: 'orange',
//     2: 'blue'
// }
// const dummyObj2 = {...colors, ..."CAT"}; //"CAT" overrides colors
// return {
//     0: 'C',
//     1: 'A',
//     2: 'T'
// }


//cloning for nested array, or objs nested in an array
const shoppingCart =[
    {
        name: 'honey orchid',
        quantity: 2,
        price: 13
    },
    {
        name: 'pear',
        quantity: 4,
        price: 4
    }
];

const cartCopy = [ ... shoppingCart];

cartCopy === shoppingCart; // < false
shoppingCart[0] === cartCopy[0]; // < true

// What should we? Deep clone
