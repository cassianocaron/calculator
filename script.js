const expression = document.getElementById('expression');
const result = document.getElementById('result');
const allClearBtn = document.getElementById('all-clear-btn');
const deleteBtn = document.getElementById('delete-btn');
let input = [];

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
        appendItem(number.innerText);
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursor = false;
        appendItem(operator.innerText);
    });
});

const plusMinusButton = document.getElementById('plus-minus-btn');
plusMinusButton.addEventListener('click', () => {
    (input[0] === '−') ? input.shift() : input.unshift('−');
    updateExpression();
});

const appendItem = (item) => {
    input.push(item);
    input.length = input.length < 15 ? input.length : 15;
    updateExpression();
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
