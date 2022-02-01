const displayArea = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector('.equal');
const dotBtn = document.querySelector('.point');
let opClicked = false, numberClicked = false, dotClicked = false, clear = false;
let left = '', operator = '', right = '';
const precision = 5, expo = 3, maxLength = 10;
//functions
function checkMaxLength() {                     //only allow user to input max of 10 digits
    if (displayArea.textContent.length >= 10) {
        return true;
    }
    return false;
}

function add(n1, n2) {
    return (n1 + n2).toPrecision(precision);
}
function subtract(n1, n2) {
    return (n1 - n2).toPrecision(precision);
}
function multiply(n1, n2) {
    result = n1 * n2;
    if (result.toString().length >= maxLength) return result.toExponential(expo);
    return n1 * n2;
}
function divide(n1, n2) {
    result = n1 / n2;
    if (result.toString().length >= maxLength) return result.toExponential(expo);
    return n1 / n2;
}
function mod(n1, n2) {
    return n1 % n2;
}
function operate(leftOp, Op, rightOp) {
    leftOp = parseFloat(leftOp);
    rightOp = parseFloat(rightOp);
    switch (Op) {
        case '+': return add(leftOp, rightOp);
        case '-': return subtract(leftOp, rightOp);
        case '*': return multiply(leftOp, rightOp);
        case '/': return divide(leftOp, rightOp);
        case '%': return mod(leftOp, rightOp);
        default: return displayArea.textContent;
    }
}
//operate on left operand and right operand
function calculate() {
    displayArea.textContent = operate(left, operator, right);
    // console.log(displayArea.textContent);
    left = displayArea.textContent;
    right = '';
}

function clearDisplay() {
    displayArea.textContent = '0';
    left = '';
    right = '';
    operator = '';
}

//listening for events
numberBtns.forEach(n => {
    n.addEventListener('click', function (e) {
        numberClicked = true;
        if (clear || displayArea.textContent === '0') {
            displayArea.textContent = '';
            dotClicked = false;
            clear = false;
        }
        displayArea.textContent += this.textContent;
        if (!checkMaxLength()) {
            if (!opClicked) {
                left = displayArea.textContent;
            } else {
                right = displayArea.textContent;
            }
        }
        // console.log(`left: ${left}, right: ${right}`);
    })
})

operators.forEach(op => {
    op.addEventListener('click', function (e) {
        // e.preventDefault();
        numberClicked = false;
        opClicked = true;
        clear = true;
        if (!right) operator = this.textContent;
        if (left && right) {
            calculate();
            operator = this.textContent;
        }
    })
})

dotBtn.addEventListener('click', function (e) {
    if (!dotClicked) {
        displayArea.textContent += '.';
        dotClicked = true;
    }

})

clearBtn.addEventListener('click', clearDisplay);

equalBtn.addEventListener('click', () => {
    // if (!right) right = displayArea.textContent;
    if (numberClicked) right = displayArea.textContent;
    if (!right) return;
    calculate();
    operator = '';
});