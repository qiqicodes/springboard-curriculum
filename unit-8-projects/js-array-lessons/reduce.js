const nums = [20,30,50,12,-2,45,99,19,22,85];

let total = 0;
for (let num of nums) {
    total += num;
}

console.log (total);

let min = nums[0];
for(let i=1;i< nums.length; i++) {
    if (nums[i] < min) min = nums[i];
}
console.log(min);

const str = "lolloapalooza";
const charFreq= {};
for(let char of str) {
    if(charFreq[char]){
        charFreq[char] +=1;
    } else {
        charFreq[char] =1;
    }
}

midtermScores = [20,30,50,12,34,45,99,19,95]
finalScores = [20,30,90,74,39,13,99,19,22,]

const minMidtermScore = midtermScores.reduce(function(min, nextScore){
    return nextScore < min ? nextScore : min;
})

const maxMidtermScore = midtermScores.reduce(function(max, nextScore){
    return nextScore > max ? nextScore : max;
}) 

const minOverallScore = finalScores.reduce(function(min, nextScore){
    return nextScore < min ? nextScore : min;
}, minMidtermScore)