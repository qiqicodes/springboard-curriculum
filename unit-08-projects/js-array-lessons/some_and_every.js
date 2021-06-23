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

words.some(function(w){
    return w.length> 25;
})

words.every(function(word){
    return word.length >=5;
})

function allStrings(arr){
    return arr.every(function(el){
        return typeof el === "string";
    });
}