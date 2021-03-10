const colors = ['red', 'blue', 'salmon', 'purple'];

// function yell(val, i) {
//     const caps =val.toUpperCase();
//     console.log(`at index ${i}, ${caps}`);
// }

// colors.forEach(yell);

// 1. loop through an array 
// 2. run a callback function on each of the value in the array
// 3. return undefined
// myForEach ([4,5,6], func(){})

// first, define function:
function myForEach(arr, callback) {
    for (let i = 0; i< arr.length; i++) {
        callback(arr[i], i);
    }
}

myForEach(colors, function(colors, i){
    console.log(colors.toUpperCase(), "at index of ", i);
})


