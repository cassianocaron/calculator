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

const deleteItem = () => {
    cursor = false;
    input.pop();
    updateExpression();
}

const clearAll = () => {
    expression.textContent = '';
    result.textContent = '0';
    input = [];
}

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursor = false;
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
    (input[0] === '-') ? input.shift() : input.unshift('-');
    updateExpression();
});

const appendItem = (item) => {
    input.push(item);
    updateExpression();
}

const updateExpression = () => {
    expression.textContent = input.join('');
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
