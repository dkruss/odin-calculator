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
})

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentOperator == null) {
            currentOperator = btn.textContent;
            num1 = +numString1;
            isNum1 = false;
        } else {
            //to do: move num2 = +numstring2 lines out of cases up here
            switch(currentOperator) {
                case "+":
                    num2 = +numString2;
                    numString1 = String(add(num1,num2));
                    num1 = +numString1;
                    break;
                case "-":
                    num2 = +numString2;
                    numString1 = String(subtract(num1,num2));
                    num1 = +numString1;
                    break;
                case "*":
                    num2 = +numString2;
                    numString1 = String(multiply(num1,num2));
                    num1 = +numString1;
                    break;
                case "/":
                    num2 = +numString2;
                    numString1 = String(divide(num1,num2));                    
                    num1 = +numString1;
                    break;
                case "x^y":
                    num2 = +numString2;
                    numString1 = String(power(num1,num2));
                    num1 = +numString1;
                    break;
                case "=":
                    //break out = as a separate button and its own listener?
                    num2 = +numString2;
                    num1 = +numString1;
                    break;
                default:
                    //default
            }
            //to do: move num1 = +numstring1 lines out of cases down here
            numString2 = "0";
            display.textContent = +numString1;
            currentOperator = btn.textContent;
        }
        console.log(btn.textContent);
    })    
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