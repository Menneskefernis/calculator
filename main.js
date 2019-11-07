const numberButtons = document.querySelectorAll('.btn-num');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equals = document.getElementById('equals');
const display = document.getElementById('display');

let currentDisplayValue = '';
let oldDisplayValue;
let operator;

function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function displayNumber() {
    
    currentDisplayValue += this.name;
    display.value = currentDisplayValue;
}

function setOperator() {
    oldDisplayValue = currentDisplayValue;
    currentDisplayValue = '';
    operator = Function('"use strict";return (' + this.name + ')')();
}

function calculate() {
    display.value = operate(operator, +oldDisplayValue, +currentDisplayValue);
    currentDisplayValue = display.value;
}

numberButtons.forEach(button => button.addEventListener('click', displayNumber));
operatorButtons.forEach(button => button.addEventListener('click', setOperator));
equals.addEventListener('click', calculate);