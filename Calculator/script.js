// Select elements
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon');
const body = document.body;
const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('button');

let expression = ''; // To store the math expression
let currentResult = ''; // To store the current number

// Theme toggle functionality
themeSun.addEventListener('click', () => {
  body.classList.remove('dark');
  body.classList.add('light');
});

themeMoon.addEventListener('click', () => {
  body.classList.remove('light');
  body.classList.add('dark');
});

// Button functionality
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.getAttribute('data-number');
    const operator = button.getAttribute('data-operator');
    const id = button.id;

    if (number) {
      currentResult += number;
      expression += number;
    } else if (operator) {
      if (/[+\-*/%]/.test(expression.slice(-1))) {
        expression = expression.slice(0, -1); // Replace operator if last char is an operator
      }
      expression += operator;
      currentResult = '';
    } else if (id === 'clear') {
      expression = '';
      currentResult = '';
    } else if (id === 'backspace') {
      if (currentResult) {
        currentResult = currentResult.slice(0, -1);
        expression = expression.slice(0, -1);
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
    resultDisplay.textContent = currentResult || '0';
  });
});
