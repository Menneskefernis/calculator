const numberButtons = document.querySelectorAll('.btn-num');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equals = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const inputDisplay = document.getElementById('input');
const expressionDisplay = document.getElementById('expression');

let currentValue = [];
let oldValue;
let operator;
let expression = '';
let lastResult = false;

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

function addToValue() {
    if (lastResult) return;
    if (currentValue[currentValue.length - 2] === '.') return;

    currentValue.push(this.name);
    displayValue();
    
    addToExpression(this.name);
}

function addToExpression(value) {
    expression += value;
}

function removeFromValue() {
    currentValue.pop();
    displayValue();
}

function clear() {
    currentValue = [];
    expression = '';
    displayValue();
    displayExpression();
}

function displayValue() {
    inputDisplay.innerHTML = currentValue.join('');
}

function displayExpression() {
    expressionDisplay.innerHTML = expression;
}

function setOperator() {

    operator = Function('"use strict";return (' + this.name + ')')();
    addToExpression(this.name
                        .replace('multiply', ' * ')
                        .replace('divide', ' / ')
                        .replace('add', ' + ')
                        .replace('subtract', ' - '));

    oldValue = currentValue.join('');
    currentValue = [];
    displayExpression();
    displayValue();
    
    lastResult = false;
}

function calculate() {
    
    let result = operate(operator, +oldValue, +currentValue.join(''));
    result = Math.round(result * 100000000) / 100000000;

    currentValue[0] = result;
    
    lastResult = true;
    
    expression = result;
    displayValue();

    expressionDisplay.innerHTML = '';

}

numberButtons.forEach(button => button.addEventListener('click', addToValue));
operatorButtons.forEach(button => button.addEventListener('click', setOperator));
deleteButton.addEventListener('click', removeFromValue);
clearButton.addEventListener('click', clear);
equals.addEventListener('click', calculate);