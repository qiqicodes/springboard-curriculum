scores = [
    0,0,0,0,0,0,23,67,88,93,99
]

scores.find(function(score) {
    return score > 75;
});

scores.find(function(socre){
    return score !== 0 && socre %2 === 0;
})

const firstEven = scores.findIndex(function(score){
    return score !== 0 && socre %2 === 0;    
}) 

// use of findIndex, when splicing an array and find the point of slice
function partition(arr, pivot){
    const pivotIdx = arr.findIndex(function(val){
        return val > 0;
    });
    const left = arr.slice[0,pivotIdx];
    const right = arr.slice(pivotIdx);
    return [left,right];
}

function myFind(arr, callback) {
    for (let i = 0; i < arr.length; i ++) {
        if(callback(arr[i], i, arr) === true) {
            return arr[i];
        } 
    }
}

myFind(scores, function(score) {
    return score > 90;
})

function myFindIndex(arr, callback) {
    for (let i = 0; i<arr.length; i++) {
        if(callback(arr[i],i,arr)=== true)
            return i;
    }
    return -1;
}

myFindIndex (scores, function(score){
    return score !== 0 && socre %2 === 0;    
})