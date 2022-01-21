const upperDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalsBtn = document.getElementById('equals-btn');

let firstTerm = '';
let currentOperator = '';
let secondTerm = '';
let expression = [];
let result = '';

allClearBtn.onclick = () => {
    clearAll();
}

deleteBtn.onclick = () => {
    deleteItem();
}

const clearAll = () => {
    firstTerm = '';
    currentOperator = '';
    secondTerm = '';
    result = '';
    expression.length = 0;
}

const deleteItem = () => {
    
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursor = false;
        appendNumber(number.innerText);
        updateDisplay();
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursor = false;
        operator.innerText === 'n!' ? appendOperator('!') : appendOperator(operator.innerText);        
        updateDisplay();
    });
});

const appendNumber = (number) => {
    if (currentOperator === '') {
        firstTerm += number;
    } else {
        secondTerm += number;
    }
}

const appendOperator = (operator) => {
    if (expression.currentOperator != '' && expression.secondTerm != '') {
        expression.nextOperator = operator;
    } else if (expression.firstTerm != '' && expression.firstTerm[expression.firstTerm.length - 1] != '−') {
        expression.currentOperator = operator;
    }
}


const updateDisplay = (result) => {
    
}

const plusMinusButton = document.getElementById('plus-minus-btn');
plusMinusButton.onclick = () => {
    cursor = false;
    if (expression.firstTerm[0] === '−') {
        expression.firstTerm = expression.firstTerm.substring(1);
    } else {
        expression.firstTerm = '−' + expression.firstTerm;
    }
    updateDisplay();
}

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const factorial = (n) => {
    return (n < 2) ? 1 : n * factorial(n - 1);
}

const operate = (a, b) => {
    if (expression.currentOperator === '!') {
        return factorial(a);
    } else if (expression.currentOperator === '÷') {
       return divide(a, b);
    } else if (expression.currentOperator === '×') {
       return multiply(a, b);
    } else if (expression.currentOperator === '−') {
        return subtract(a, b);
    } else if (expression.currentOperator === '+') {
        return add(a, b);
    } else {
        return a;
    }
}

equalsBtn.onclick = () => {
    if (result === undefined) {
        result = computeExpression(expression.firstTerm, expression.secondTerm);
        console.log(result);
    } else {        
        result = computeExpression(expression.firstTerm, expression.secondTerm);
    }
    if (isNaN(result)) {
        resultDisplay.textContent = 'Syntax Error';
    } else if (result === Infinity) {
        resultDisplay.textContent = 'Math Error';
    } else {
        resultDisplay.textContent = result;
    }
}

const computeExpression = (a, b) => {
    if (a[0] === '−') {
        a = a.replace('−', '-');
    }
    return operate(parseFloat(a), parseFloat(b));
}

// Blinking cursor
let cursor = true;
let speed = 500;

setInterval(() => {
    if (cursor) {
        document.getElementById('cursor').style.opacity = 0;
        cursor = false;
    } else {
        document.getElementById('cursor').style.opacity = 1;
        cursor = true;
    }
}, speed);
