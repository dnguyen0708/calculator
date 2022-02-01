const displayArea = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector('.equal');
const dotBtn = document.querySelector('.point');
let opClicked = false, numberClicked = false, dotClicked = false;
let left = 0, operator = '', right = 0;

//functions
function checkMaxLength() {                     //only allow user to input max of 10 digits
    if (displayArea.textContent.length >= 10) {
        return true;
    }
    return false;
}

function add(n1, n2) {
    return (n1 + n2).toPrecision(5);
}
function subtract(n1, n2) {
    return (n1 - n2).toPrecision(5);
}
function multiply(n1, n2) {
    result = n1 * n2;
    if (result.toString().length >= 10) return result.toExponential(4);
    return n1 * n2;
}
function divide(n1, n2) {
    result = n1 / n2;
    if (result.toString().length >= 10) return result.toExponential(4);
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
    console.log(displayArea.textContent);
    left = displayArea.textContent;
    right = 0;
}

function clearDisplay() {
    displayArea.textContent = '0';
    left = right = 0;
    operator = ''
}

//listening for events
numberBtns.forEach(n => {
    n.addEventListener('click', function (e) {
        numberClicked = true;
        if (!checkMaxLength()) {
            // if(displayArea.textContent.includes('0.') && opClicked)
            if (opClicked || displayArea.textContent === '0') {
                opClicked = false;
                displayArea.textContent = '';
                dotClicked = false;
            }
            displayArea.textContent += this.textContent;
        }
    })
})

operators.forEach(op => {
    op.addEventListener('click', function (e) {
        e.preventDefault();
        numberClicked = false;
        opClicked = true;
        if (!left) {
            left = displayArea.textContent;
            operator = this.textContent;
        }
        else if (displayArea.textContent) {
            right = displayArea.textContent;
            calculate();
            operator = this.textContent;
        }
        // console.log(`left: ${left}, right: ${right}, operator: ${operator}`)
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