const words = [
    "accoutrements",
    "accessories",
    "acumen",
    "anomalistic",
    "circumlocution",
    "concupiscent",  
    "conviviality" 
]


const isVowel = function (char) {
    return 'aeiou'.indexOf(char) !== -1;
}

function myFilter(arr, callback) {
    const filteredArr =[];
    for (let i=0; i<arr.length; i++)
    if (callback(arr[i]), i){
        filteredArr.push(arr[i]);

    }
    return filteredArr;
}

const shortWords = myFilter(words, function(w){
    return w.length <= 10;
})

const everyOtherWord = myFilter(words, function(w, i){
    return i % 2 === 0;
})


function mySome(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        if (callback(arr[i], i, arr)) return true;
    }
    return false
}

mySome([4,5,6,7], function(n){
    return n>5;
});

function myEvery(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        if (!callback(arr[i], i , arr))  return false;
    }
    return true;
}
    
    
    