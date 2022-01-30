const displayArea = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector('.equal');
let opClicked = false;
let left = 0, operator = '', right = 0;
let result = 0;


//functions
function checkMaxLength() {
    if (displayArea.textContent.length >= 10) {
        return true;
    }
    return false;
}

function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1, n2) {
    return n1 - n2;
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
function operate(leftOp, Op, rightOp) {
    leftOp = parseFloat(leftOp);
    rightOp = parseFloat(rightOp);
    switch (Op) {
        case '+': return add(leftOp, rightOp);
        case '-': return subtract(leftOp, rightOp);
        case '*': return multiply(leftOp, rightOp);
        case '/': return divide(leftOp, rightOp);
        default: return displayArea.textContent;
    }
}
function calculate() {
    displayArea.textContent = operate(left, operator, right);
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
        if (!checkMaxLength()) {
            if (displayArea.textContent == 0 || opClicked) {
                opClicked = false;
                displayArea.textContent = '';
            }
            displayArea.textContent += this.textContent;
        }
    })
})

operators.forEach(op => {
    op.addEventListener('click', function (e) {
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
        console.log(`left: ${left}, right: ${right}, operator: ${operator}`)
    })
})


clearBtn.addEventListener('click', clearDisplay);

equalBtn.addEventListener('click', () => {
    if (!right) right = displayArea.textContent;
    calculate();
    operator = '';
});