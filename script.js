const input = document.getElementById('input');
const result = document.getElementById('result');
let expression = [];

const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = () => {
    input.textContent = '';
    result.textContent = '0';
    expression = [];
}

const deleteBtn = document.getElementById('del-btn');
deleteBtn.onclick = () => {
    cursor = false;
    expression.pop();
    input.textContent = expression.join('');
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

const appendInput = (number) => {    
    expression.push(number);
    return input.textContent = expression.join('');
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

