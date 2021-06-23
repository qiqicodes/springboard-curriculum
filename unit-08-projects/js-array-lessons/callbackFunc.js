function add (x, y) {
    return x + y;
}

function subtract (x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

const mathFuncs = [add, subtract, multiply, divide];

function doMath(a,b, doAMathFunc) {
    return doAMathFunc(a,b);
}

doMath(2,4, function (a,b){
    console.log(a ** b);
})

function doAllMath(a, b, mathFuncs) {
    for (let func of mathFuncs) {
        console.log(func (a, b));
    }
}