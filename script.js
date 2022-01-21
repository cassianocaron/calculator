const cursor = document.getElementById('cursor');
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
let nextOperator = '';
let nextTerm = '';
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
    nextTerm = '';
    result = '';
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
        if (number.innerText === '.') {
            if (firstTerm.includes('.') === false) {
                appendNumber('.');
            }
            if (firstTerm != '' && currentOperator != '' && secondTerm.includes('.') === false) {
                appendNumber('.');
            }
        } else {
            appendNumber(number.innerText);
        }
        updateDisplay();
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursorStatus = false;
        if (firstTerm != '' && currentOperator != '' && secondTerm != '') {
            result = computeExpression(firstTerm, secondTerm);
            nextTerm = '';
        }
        operator.innerText === 'n!' ? appendOperator('!') : appendOperator(operator.innerText);
        updateDisplay();
    });
});

const appendNumber = (number) => {
    if (currentOperator === '') {
        firstTerm += number;
    } else if (result != '') {
        nextTerm += number;
    } else {
        secondTerm += number;
    }
}

const appendOperator = (operator) => {
    currentOperator = operator;
}

const updateDisplay = () => {
    if (result != '' && typeof(result) === 'number' && result != Infinity && isNaN(result) === false) {           
        firstTerm = result.toString();
        secondTerm = nextTerm;
        upperDisplay.textContent = firstTerm + currentOperator + secondTerm;
        resultDisplay.textContent = result;
    }
    if (isNaN(result)) {
        toggleCursor('off');
        upperDisplay.textContent = '';
        resultDisplay.textContent = 'Syntax Error';
    }
    if (result === Infinity) {
        toggleCursor('off');
        upperDisplay.textContent = '';
        resultDisplay.textContent = 'Math Error';
    } 
    if (result === '') {
        upperDisplay.textContent = firstTerm + currentOperator + secondTerm;
        resultDisplay.textContent = 0
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
    } else {
        return a;
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
    return a / b;
}

const factorial = (n) => {
    return (n < 2) ? 1 : n * factorial(n - 1);
}



const computeExpression = (a, b) => {
    if (a[0] === '−') {
        a = a.replace('−', '-');
    }
    return operate(parseFloat(a), parseFloat(b));
}

// const plusMinusButton = document.getElementById('plus-minus-btn');
// plusMinusButton.onclick = () => {
//     cursor = false;
//     if (expression.firstTerm[0] === '−') {
//         expression.firstTerm = expression.firstTerm.substring(1);
//     } else {
//         expression.firstTerm = '−' + expression.firstTerm;
//     }
//     updateDisplay();
// }

// equalsBtn.onclick = () => {
//     if (result === undefined) {
//         result = computeExpression(expression.firstTerm, expression.secondTerm);
//         console.log(result);
//     } else {        
//         result = computeExpression(expression.firstTerm, expression.secondTerm);
//     }
//     if (isNaN(result)) {
//         resultDisplay.textContent = 'Syntax Error';
//     } else if (result === Infinity) {
//         resultDisplay.textContent = 'Math Error';
//     } else {
//         resultDisplay.textContent = result;
//     }
// }

const toggleCursor = (value) => {
    if (value === 'on') {
        cursor.classList.remove('off');
    } else {
        cursor.classList.add('off');
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
