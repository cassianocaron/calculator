const upperDisplay = document.getElementById('expression');
const result = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const equalsBtn = document.getElementById('equals-btn');
let expression = [];
let firstNumber = [];
let currentOperator;
let secondNumber = [];
let nextOperator;

allClearBtn.onclick = () => {
    clearAll();
}

deleteBtn.onclick = () => {
    deleteItem();
}

const clearAll = () => {
    upperDisplay.textContent = '';
    result.textContent = '0';
    firstNumber.length = 0;
    secondNumber.length = 0;
    expression.length = 0;
}

const deleteItem = () => {
    cursor = false;
    expression.pop();
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
    updateDisplay();
});

const appendNumber = (number) => {
    if (currentOperator) {
        secondNumber.push(number);
    } else {
        firstNumber.push(number)
    }
    updateDisplay();
}

const appendOperator = (operator) => {
    if (firstNumber.length != 0) {
        currentOperator = operator;
    }
    updateDisplay();
}

const updateDisplay = () => {
    expression = firstNumber;
    console.log(expression);
    if (currentOperator) {
        expression.push(currentOperator);
        currentOperator = nextOperator;
    }
    expression.concat(secondNumber)
    upperDisplay.textContent = expression.join('');
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
