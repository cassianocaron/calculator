const upperDisplay = document.getElementById('expression');
const cursor = document.getElementById('cursor');
const resultDisplay = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const plusMinusBtn = document.getElementById('plus-minus-btn');
const equalsBtn = document.getElementById('equals-btn');

let firstTerm = '';
let currentOperator = '';
let secondTerm = '';
let expression = '';
let result = 0;
let resultCounter = 0;

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
    result = 0;
    resultCounter = 0;
    toggleCursor('on');
    updateDisplay();
}

const deleteItem = () => {
    if (secondTerm != '') {
        secondTerm = secondTerm.slice(0, -1);
    } else if (currentOperator != '') {
        currentOperator = currentOperator.slice(0, -1);
    } else if (firstTerm != '') {
        firstTerm = firstTerm.slice(0, -1);
    }
    updateDisplay();
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursorStatus = false;
        if (isNaN(result) || result === Infinity || result === 'Not defined' || expression.length > 22) {
            return;
        }
        if (firstTerm != '' && currentOperator != '' && secondTerm != '' && resultCounter === 1) {
                clearAll();
        }
        if (currentOperator != '!') {
            appendNumber(number.innerText);
        }
        updateDisplay();
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursorStatus = false;
        if (isNaN(result) || result === Infinity || result === 'Not defined'|| expression.length > 22) {
            return;
        }
        if (firstTerm != '' && currentOperator != '' && secondTerm != '') {
            result = computeExpression(firstTerm, secondTerm);
            firstTerm = result.toString();
            secondTerm = '';
        } else if (firstTerm != '' && currentOperator === '!' && result != '0') {
            firstTerm = result.toString();
        }
        operator.innerText === 'n!' ? appendOperator('!') : appendOperator(operator.innerText);
        updateDisplay();
    });
});

plusMinusBtn.onclick = () => {
    cursorStatus = false;
    if (firstTerm[0] === '−') {
        firstTerm = firstTerm.substring(1);
    } else {
        firstTerm = '−' + firstTerm;
    }
    updateDisplay();
}

equalsBtn.onclick = () => {
    if (firstTerm != '' && currentOperator === '!') {
        result = computeExpression(firstTerm);
        updateDisplay();
    } else if (firstTerm != '' && currentOperator != '' && secondTerm != '') {
        result = computeExpression(firstTerm, secondTerm);
        updateDisplay();
    }
}

const appendNumber = (number) => {
    if (currentOperator === '') {
        firstTerm += number;
    } else {
        secondTerm += number;
    }
}

const appendOperator = (operator) => {
    if (firstTerm != '') {
        currentOperator = operator;
    }
}

const updateDisplay = () => {
    if (result > 0) {
        resultCounter++;
        if ((result.toString()).length >= 15 && result > 1000000000) {
            result = (result.toExponential(9)).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
        } else {
            result = +result.toFixed(6);
        }
    }
    expression = firstTerm + currentOperator + secondTerm;
    upperDisplay.textContent = expression;
    resultDisplay.textContent = result;

    if (isNaN(result) && result != 'Not defined') {
        toggleCursor('off');
        upperDisplay.textContent = '';
        resultDisplay.textContent = 'Syntax Error';
    } else if (result === Infinity || result === 'Not defined') {
        toggleCursor('off');
        upperDisplay.textContent = '';
        resultDisplay.textContent = 'Math Error';
    }
}

const operate = (a, b) => {
    if (currentOperator === '!') {
        return factorial(a);
    } else if (currentOperator === '÷') {
       return divide(a, b);
    } else if (currentOperator === '×') {
       return multiply(a, b);
    } else if (currentOperator === '−') {
        return subtract(a, b);
    } else if (currentOperator === '+') {
        return add(a, b);
    }
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
    if (firstTerm === '0' && currentOperator === '÷' && secondTerm === '0') {
        return 'Not defined';
    }
    return a / b;
}

const factorial = (n) => {
    // Factorial is defined for any non-negative integer,
    // but I'm limiting it to 150 to avoid too many function calls
    if (n < 0 || !(Number.isInteger(n)) || n > 150) {
        return 'Not defined';
    }
    return (n === 0 || n === 1) ? 1 : n * factorial(n - 1);
}

const computeExpression = (a, b) => {
    if (a[0] === '−') {
        a = a.replace('−', '-');
    }
    return operate(parseFloat(a), parseFloat(b));
}

const toggleCursor = (value) => {
    if (value === 'off') {
        cursor.classList.add('off');
    } else {
        cursor.classList.remove('off');
    }
}

// Blinking cursor
let cursorStatus = true;
let speed = 500;

setInterval(() => {
    if (cursorStatus) {
        cursor.style.opacity = 0;
        cursorStatus = false;
    } else {
        cursor.style.opacity = 1;
        cursorStatus = true;
    }
}, speed);
