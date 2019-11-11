const calcButtons = document.querySelectorAll('.btn-calc');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const equals = document.getElementById('equals');
const inputDisplay = document.getElementById('input');
const expressionDisplay = document.getElementById('expression');

let expressionString = [];
let number = '';
let oldDisplayValue = '';
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

function updateDisplay() {
    inputDisplay.textContent = replaceOperatorsInString(expressionString.join(''));
                        
}

function replaceOperatorsInString(string) {
    return string
        .replace(/add/g, ' + ')
        .replace(/subtract/g, ' - ')
        .replace(/multiply/g, ' * ')
        .replace(/divide/g, ' / ');
}

function addToExpression(button) {
    if (!button) return;
    // if (expressionString.length > 5) return;
    if (expressionString[expressionString.length - 2] === '.' && button.name === '.') return;
    if (button.name === '.' && lastResult) return;

    expressionDisplay.textContent = '';

    if (
        expressionString[expressionString.length - 1] === 'divide' &&
        button.name === '0'
        ) {
        expressionDisplay.textContent = 'No can do!';
        return;
    }
    
    if (
        !button.name.match(/[0-9]/) &&
        expressionString.length > 0 &&
        expressionString[expressionString.length - 1].match(/[0-9]/)
        ) {
            expressionString.push(button.name);
            lastResult = false;
    }

    if (
        button.name.match(/[0-9]/) &&
        expressionString[expressionString.length - 2] !== '.'
        ) {
            expressionString.push(button.name);
    }
}

function deleteFromExpression() {
    expressionString.pop();
}

function clear() {
    expressionString = [];
    updateDisplay();
    expressionDisplay.textContent = '';
    lastResult = false;
}

function condenseExpression() {
    const condensedExp = [];
    let number = '';

    for (let i = 0; i < expressionString.length; i++) {
        
        
        if (!expressionString[i].match(/[0-9\.]/)) {
            condensedExp.push(number);
            condensedExp.push(expressionString[i]);
            number = '';
            continue;
        }
        number += expressionString[i];
    }
    condensedExp.push(number);
    return condensedExp;
}

function evaluate() {

    let condensedExp = condenseExpression();

    if (expressionString.includes('multiply')) {
        calcPart(condensedExp, 'multiply');
    }

    if (expressionString.includes('divide')) {
        calcPart(condensedExp, 'divide');
    }

    if (expressionString.includes('add')) {
        calcPart(condensedExp, 'add');
    }

    if (expressionString.includes('subtract')) {
        calcPart(condensedExp, 'subtract');
    }
    
    const result = Math.round(condensedExp * 100000000) / 100000000;

    if (!expressionString[expressionString.length - 1].match(/[0-9]/)) {
        expressionString.splice(-1, 1);
    }
    expressionDisplay.textContent = replaceOperatorsInString(expressionString.join('')) + ' =';
    expressionString = [result.toString()];
    lastResult = true;    
}

function calcPart(expression, operator) {
    
    for (let i = expression.length; i > 0; i--) {
        if (expression[i] === `${operator}`) {
            const partResult = operate(window[operator], +expression[i - 1], +expression[i + 1]);
            expression.splice(i - 1, 3, partResult);
        }
    }
    return expression;
}

function keyboardSupport(e) {

    if (e.keyCode.toString() === '8') {
        deleteFromExpression();
        updateDisplay();
        return;
    }
    
    if (e.keyCode.toString() === '13') {
        evaluate();
        updateDisplay();
        return;
    }

    if (e.keyCode.toString() === '27') {
        clear();
        updateDisplay();
        return;
    }

    const button = Array.from(calcButtons).find(button => button.dataset.value === e.keyCode.toString());

    addToExpression(button);
    updateDisplay();
}

function setNumberBtnColor() {
    const nrButtons = Array.from(calcButtons);

    nrButtons.forEach((button) => {
        if (button.name.match(/[0-9]/)) {
            button.style.backgroundImage = `linear-gradient(to bottom right,
                                                ${getRandomColorHSL()},
                                                ${getRandomColorHSL()}`;
        }
    });
}

function getRandomColorRGB() {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColorHSL() {
    const h = Math.floor(Math.random() * 256);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * (80 - 25 + 1) + 25);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

calcButtons.forEach(button => button.addEventListener('click', (e) => {
    addToExpression(e.target);
    updateDisplay();
}));

deleteButton.addEventListener('click', () => {
    deleteFromExpression();
    updateDisplay();
});

equals.addEventListener('click', () => {
    evaluate();
    updateDisplay();
});

clearButton.addEventListener('click', clear);

window.addEventListener('keydown', keyboardSupport);

window.onload = setNumberBtnColor();