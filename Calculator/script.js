let currentNumber = '0';
let previousNumber = null;
let operation = null;
let shouldResetDisplay = false;
let fullEquation = '';

const resultDisplay = document.getElementById('result');
const equationDisplay = document.getElementById('equation');
const lightThemeBtn = document.getElementById('lightTheme');
const darkThemeBtn = document.getElementById('darkTheme');

// Theme Toggle
lightThemeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark');
    lightThemeBtn.classList.add('active');
    darkThemeBtn.classList.remove('active');
});

darkThemeBtn.addEventListener('click', () => {
    document.body.classList.add('dark');
    darkThemeBtn.classList.add('active');
    lightThemeBtn.classList.remove('active');
});

// Calculator Functions
function updateDisplay(value) {
    resultDisplay.textContent = Number(value).toLocaleString();
}

function handleNumber(num) {
    if (shouldResetDisplay) {
        currentNumber = num;
        shouldResetDisplay = false;
    } else {
        currentNumber = currentNumber === '0' ? num : currentNumber + num;
    }
    updateDisplay(currentNumber);
}

function handleOperator(op) {
    if (previousNumber === null) {
        previousNumber = currentNumber;
        fullEquation = `${currentNumber} ${op}`;
    } else {
        calculate(false);
        fullEquation = `${resultDisplay.textContent} ${op}`;
    }
    equationDisplay.textContent = fullEquation;
    operation = op;
    shouldResetDisplay = true;
}

function calculate(isEquals = true) {
    if (previousNumber === null || operation === null) return;

    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: return;
    }

    if (isEquals) {
        fullEquation = `${previousNumber} ${operation} ${currentNumber} =`;
        equationDisplay.textContent = fullEquation;
    }

    currentNumber = result.toString();
    updateDisplay(currentNumber);
    previousNumber = isEquals ? null : result.toString();
    operation = isEquals ? null : operation;
}

function handleDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        resultDisplay.textContent = currentNumber;
    }
}

function handlePercentage() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay(currentNumber);
}

function handleToggleSign() {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateDisplay(currentNumber);
}

// Event Listeners
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value.match(/[0-9]/)) {
            handleNumber(value);
        } else if (['+', '-', '×', '÷'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculate(true);
        } else if (value === 'AC') {
            currentNumber = '0';
            previousNumber = null;
            operation = null;
            fullEquation = '';
            equationDisplay.textContent = '';
            updateDisplay('0');
        } else if (value === '.') {
            handleDecimal();
        } else if (value === '%') {
            handlePercentage();
        } else if (value === '±') {
            handleToggleSign();
        } else if (value === '⌫') {
            currentNumber = currentNumber.slice(0, -1) || '0';
            updateDisplay(currentNumber);
        }
    });
});