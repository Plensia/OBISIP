// Select necessary elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('button');

// Variables to store the calculator state
let expression = '';
let currentResult = '0';

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

// Button functionality
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');
    const operator = button.getAttribute('data-operator');
    const id = button.id;

    if (number) {
      if (currentResult === '0' || /[+\-*/%]/.test(expression.slice(-1))) {
        currentResult = number;
      } else {
        currentResult += number;
      }
      expression += number;
    } else if (operator) {
      if (/[+\-*/%]/.test(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      expression += operator;
    } else if (id === 'clear') {
      expression = '';
      currentResult = '0';
    } else if (id === 'backspace') {
      if (expression.length > 0) {
        expression = expression.slice(0, -1);
        currentResult = currentResult.slice(0, -1) || '0';
      }
    } else if (id === 'equals') {
      try {
        currentResult = eval(expression.replace(/÷/g, '/').replace(/×/g, '*'));
        expression = currentResult.toString();
      } catch {
        currentResult = 'Error';
      }
    }

    // Update display
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = currentResult;
  });
});
