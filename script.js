const upperDisplay = document.getElementById('expression');
const result = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const equalsBtn = document.getElementById('equals-btn');

let expression = {
    firstTerm: '',
    currentOperator: '',
    secondTerm: '',
    nextOperator: ''
}

allClearBtn.onclick = () => {
    clearAll();
}

deleteBtn.onclick = () => {
    deleteItem();
}

const clearAll = () => {
    upperDisplay.textContent = '';
    result.textContent = '0';
    expression.firstTerm = '';
    expression.currentOperator = '';
    expression.secondTerm = '';
    expression.nextOperator = '';
}

const deleteItem = () => {
    cursor = false;
    if (expression.nextOperator != '') {
        expression.nextOperator = expression.nextOperator.slice(0, -1);
    } else if (expression.secondTerm != '') {
        expression.secondTerm = expression.secondTerm.slice(0, -1);
    } else if (expression.currentOperator != '') {
        expression.currentOperator = expression.currentOperator.slice(0, -1);
    } else {
        expression.firstTerm = expression.firstTerm.slice(0, -1);
    }
    updateDisplay();
}

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursor = false;
        if (input[input.length - 1] === '.' && number.innerText === '.') {
            return;
        }
        appendNumber(number.innerText);
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursor = false;
        operator.innerText === 'n!' ? appendOperator('!') : appendOperator(operator.innerText);
    });
});

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

const appendNumber = (number) => {
    if (expression.currentOperator === '') {
        expression.firstTerm += number;
    } else {
        expression.secondTerm += number;
    }
    updateDisplay();
}

const appendOperator = (operator) => {
    if (expression.currentOperator != '' && expression.secondTerm != '') {
        expression.nextOperator = operator;
    } else {
        expression.currentOperator = operator;
    }
    updateDisplay();
}


const updateDisplay = () => {
    upperDisplay.textContent = Object.values(expression).join('');
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
    if (currentOperator === '÷') {
       return divide(a, b);
    } else if (currentOperator === '×') {
       return multiply(a, b);
    } else if (currentOperator === '−') {
        return subtract(a, b);
    } else if (nextOperator === '+') {
        return add(a, b);
    } else {
        return factorial(a);
    }
}

equalsBtn.onclick = () => {
    
}

// const parseInput = () => {
//     inputCopy = [...input];
//     for (let i = 0; i < inputCopy.length; i++) {
//         inputCopy[i] = inputCopy[i].replace(/(\÷)/g, '/');
//         inputCopy[i] = inputCopy[i].replace(/(\×)/g, '*');
//         inputCopy[i] = inputCopy[i].replace(/(\−)/g, '-');
//     }
// }

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
