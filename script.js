const expression = document.getElementById('expression');
const result = document.getElementById('result');
let expressArray = [];

const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = () => {
    expression.textContent = '';
    result.textContent = '0';
    expressArray = [];
}

const deleteBtn = document.getElementById('del-btn');
deleteBtn.onclick = () => {
    cursor = false;
    expressArray.pop();
    expression.textContent = expressArray.join('');
}

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        cursor = false;
        appendInput(number.innerText);
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        cursor = false;
        appendInput(operator.innerText);
    });
});

function appendInput(number) {    
    expressArray.push(number);
    return expression.textContent = expressArray.join('');
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

