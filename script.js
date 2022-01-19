const expression = document.getElementById('expression');
const result = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const equalsBtn = document.getElementById('equals-btn');
let input = [];
let firstNumber = [];
let currentOperator;
let nextOperator;
let secondNumber = [];

allClearBtn.onclick = () => {
    clearAll();
}

deleteBtn.onclick = () => {
    deleteItem();
}

const clearAll = () => {
    expression.textContent = '';
    result.textContent = '0';
    input.length = 0;
}

const deleteItem = () => {
    cursor = false;
    input.pop();
    updateExpression();
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
        if (operator.innerText === 'n!') {
            appendOperator('!');
        } else {
            appendOperator(operator.innerText);
        }
    });
});

const plusMinusButton = document.getElementById('plus-minus-btn');
plusMinusButton.addEventListener('click', () => {
    (input[0] === '−') ? input.shift() : input.unshift('−');
    updateExpression();
});

const appendNumber = (number) => {
    // if (firstNumber.includes('÷') || firstNumber.includes('×') || firstNumber.includes('−') || firstNumber.includes('+')) {
    (currentOperator) ? firstNumber.push(number) : secondNumber.push(number);
    // firstNumber.length = firstNumber.length < 15 ? firstNumber.length : 15;
}

const appendOperator = (operator) => {
    if (firstNumber.length != 0) {
        currentOperator = operator;
    }
}

const updateExpression = () => {
    expression.textContent = input.join('');
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

const operate = (a, operator, b) => {
    if (operator === '÷') {
        divide(a, b);
    } else if (operator === '×') {
        multiply(a, b);
    } else if (operator === '−') {
        subtract(a, b);
    } else if (operator === '+') {
        add(a, b);
    } else {
        factorial(a);
    }
}

equalsBtn.onclick = () => {
    operate(firstNumber, operator, secondNumber);
}

const parseInput = () => {
    inputCopy = [...input];
    for (let i = 0; i < inputCopy.length; i++) {
        inputCopy[i] = inputCopy[i].replace(/(\÷)/g, '/');
        inputCopy[i] = inputCopy[i].replace(/(\×)/g, '*');
        inputCopy[i] = inputCopy[i].replace(/(\−)/g, '-');
    }
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
