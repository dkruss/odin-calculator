function add(a,b) {
    return a + b;
}

function subtract(a,b) { 
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function power(a,b) {
    return a ** b;
}

let numString1 = "0";
let numString2 = "0";
let num1 = 0;
let num2 = 0;
let isNum1 = true;
let currentOperator = null;

const display = document.querySelector("div.display>h1");
const digitButtons = document.querySelectorAll("button.digit");
const operatorButtons = document.querySelectorAll("button.operator");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");

// TODO:
// - add +/- functionality
// - add % functionality
// - fix text overflow due to rounding - e.g. 100000000000000000000 goes outside the box
// - Adding 0 after decimal point doesn't show up until another digit is added, e.g.
//     "1.0000" shows as "1" until a "2" is added, at which point it shows as "1.00002
//   - Similarly, adding a "." doesn't appear until 
// - fix floating point issue - e.g. 0.1 + 0.2 = 0.30000000000000004, 12.3 + 45.6 = 57.900000000000006
//   - https://0.30000000000000004.com/
// - Fix issue where adding a new number after a calculation doesn't clear the previous - see below

// Current issue: if 1+2 is calculated, then = is hit giving 3,
// then 4 and = or another operator are hit, it returns 3 as 3 is still stored as num2
// 
// Expected behaviour: typing "4 =" or "4 +" should ALWAYS return 4, 
// not the previously stored number

digitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        typeDigit(+btn.textContent);
    })
})

clearButton.addEventListener("click", () => {
    numString1 = "0";
    numString2 = "0";
    num1 = 0;
    num2 = 0;
    isNum1 = true;
    currentOperator = null;
    display.textContent = numString1;
    decimalButton.disabled = false;
})

decimalButton.addEventListener("click", () => {
    if (isNum1) {
        numString1 += ".";
    } else {
        numString2 += ".";
    }
    decimalButton.disabled = true;
})

function typeDigit(digit) {
    if (isNum1) {
        numString1 += digit;
        display.textContent = +numString1;
    } else {
        numString2 += digit;
        display.textContent = +numString2;
    }
}

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentOperator == null) {
            currentOperator = btn.textContent;
            num1 = +numString1;
            isNum1 = false;
        } else {
            num2 = +numString2;
            switch(currentOperator) {
                case "+":
                    numString1 = String(add(num1,num2));
                    break;
                case "-":
                    numString1 = String(subtract(num1,num2));
                    break;
                case "*":
                    numString1 = String(multiply(num1,num2));
                    break;
                case "/":
                    numString1 = String(divide(num1,num2));
                    break;
                case "x^y":
                    numString1 = String(power(num1,num2));
                    break;
                case "=":
                    // break out "=" as a separate button and its own listener?
                    break;
                default:
                    //default
            }
            num1 = +numString1;
            numString2 = "0";
            display.textContent = +numString1;
            currentOperator = btn.textContent;
        }
        decimalButton.disabled = false;
        console.log(btn.textContent);
    })    
})