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
let lastButtonPressed = '';

allClearBtn.onclick = () => {
    clearAll();
}

deleteBtn.onclick = () => {
    lastButtonPressed = 'delete';
    deleteItem();
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursorStatus = false;
        if (resultDisplay.textContent === 'Math Error' || resultDisplay.textContent === 'Syntax Error' || expression.length >= 22) {
            return;
        }
        if (lastButtonPressed === 'equals') {
            clearUpperDisplay();
            lastButtonPressed = 'number';
        }
        if (currentOperator !== '!') {
            appendNumber(number.innerText);
        }
        updateDisplay();
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursorStatus = false;
        lastButtonPressed = 'operator';
        if (resultDisplay.textContent === 'Math Error' || resultDisplay.textContent === 'Syntax Error' || expression.length >= 24) {
            return;
        }
        if (firstTerm && currentOperator && secondTerm && secondTerm[secondTerm.length - 1] !== '.') {
            result = computeExpression(firstTerm, secondTerm);
            updateResult();
            firstTerm = result.toString();
            secondTerm = '';
        } else if (firstTerm && currentOperator === '!' && result !== 0) {
            firstTerm = result.toString();
        }
        operator.innerText === 'n!' ? appendOperator('!') : appendOperator(operator.innerText);
        updateDisplay();
    });
});

plusMinusBtn.onclick = () => {
    cursorStatus = false;
    if (!currentOperator) {
        if (firstTerm[0] === '−' || firstTerm[0] === '-') {
            firstTerm = firstTerm.substring(1);
        } else {
            firstTerm = '−' + firstTerm;
        }
    } else if (currentOperator !== '!') {
        if (secondTerm[0] === '−' || secondTerm[0] === '-') {
            secondTerm = secondTerm.substring(1);
        } else {
            secondTerm = '−' + secondTerm;
        }
    }
    updateDisplay();
}

equalsBtn.onclick = () => {
    if (firstTerm && currentOperator === '!') {
        lastButtonPressed = 'equals';
        result = computeExpression(firstTerm);
        updateResult();
        updateDisplay();
    } else if (firstTerm && currentOperator && secondTerm && secondTerm[secondTerm.length - 1] !== '.') {
        lastButtonPressed = 'equals';
        result = computeExpression(firstTerm, secondTerm);
        updateResult();
        updateDisplay();
    }
}

const clearUpperDisplay = () => {
    firstTerm = '';
    currentOperator = ''
    secondTerm = '';
}

const clearAll = () => {
    clearUpperDisplay();
    result = 0;
    lastButtonPressed = '';
    toggleCursor('on');
    updateDisplay();
}

const deleteItem = () => {
    if (secondTerm) {
        secondTerm = secondTerm.slice(0, -1);
    } else if (currentOperator) {
        currentOperator = currentOperator.slice(0, -1);
    } else if (firstTerm) {
        firstTerm = firstTerm.slice(0, -1);
    }
    updateDisplay();
}

const appendNumber = (number) => {
    if (number === '.') {
        if ((!firstTerm.includes('.') && firstTerm && !currentOperator && firstTerm[0] !== '−') || 
        (!firstTerm.includes('.') && firstTerm[0] === '−' && firstTerm.length > 1)) {
            firstTerm += number;
        } else if ((!firstTerm && !currentOperator) || (!firstTerm.includes('.') && firstTerm[0] === '−' && firstTerm.length === 1)) {
            firstTerm += "0" + number;
        } else if ((currentOperator && !secondTerm.includes('.') && secondTerm && secondTerm[0] !== '−') ||
        (!secondTerm.includes('.') && secondTerm[0] === '−' && secondTerm.length > 1)) {
            secondTerm += number;
        } else if ((currentOperator && !secondTerm) || (!secondTerm.includes('.') && secondTerm[0] === '−' && secondTerm.length === 1)) {
            secondTerm += "0" + number;
        }
    } else {
        currentOperator === '' ? firstTerm += number : secondTerm += number;
    }
}

const appendOperator = (operator) => {
    if (firstTerm && firstTerm[firstTerm.length - 1] !== '.' && !secondTerm) {
        currentOperator = operator;
    }
}

const updateResult = () => {
    if (typeof result === 'number' && result !== 0) {
        if ((result.toString()).length >= 15 && (result > 100000000 || result < -100000000)) {
            result = (result.toExponential(9)).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
        } else {
            result = +result.toFixed(6);
        }
    }
}

const updateDisplay = () => {
    expression = firstTerm + currentOperator + secondTerm;
    upperDisplay.textContent = expression;
    resultDisplay.textContent = result;

    if (isNaN(result) && result !== 'Not defined') {
        toggleCursor('off');
        upperDisplay.textContent = '';
        resultDisplay.textContent = 'Syntax Error';
    } else if (result === Infinity || result === -Infinity || result === 'Not defined') {
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
    if ((firstTerm === '0' || firstTerm === '−0') && currentOperator === '÷' && (secondTerm === '0' || secondTerm === '−0')) {
        return 'Not defined';
    }
    return a / b;
}

const factorial = (n) => {
    // Factorial IS defined for any non-negative integer,
    // but limiting it to a number avoids too many function calls
    if (n < 0 || !(Number.isInteger(n)) || n > 150) {
        return 'Not defined';
    }
    return (n === 0 || n === 1) ? 1 : n * factorial(n - 1);
}

const computeExpression = (a, b) => {
    if (a[0] === '−') {
        a = a.replace('−', '-');
    }    
    if (b && b[0] === '−') {
        b = b.replace('−', '-');
    }
    return b ? operate(parseFloat(a), parseFloat(b)) : operate(parseFloat(a));
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
