// Initialize variables
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let displayValue = '0';
let isSecondOperand = false;

// Select the display element and buttons
const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');

// Update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Perform basic arithmetic operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

// Perform the calculation based on the operator
function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

// Handle digit button clicks
digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isSecondOperand) {
      displayValue = button.textContent; // Start fresh for the second number
      isSecondOperand = false;
    } else {
      displayValue = displayValue === '0' ? button.textContent : displayValue + button.textContent;
    }
    updateDisplay(displayValue);
  });
});

// Handle operator button clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === '=') {
      if (firstNumber !== null && currentOperator !== null && !isSecondOperand) {
        secondNumber = parseFloat(displayValue); // Set the second number
        const result = calculate(firstNumber, currentOperator, secondNumber);
        updateDisplay(result);
        firstNumber = result; // Store result as first number for next calculation
        currentOperator = null;
      }
    } else {
      if (!isSecondOperand && firstNumber !== null) {
        secondNumber = parseFloat(displayValue); // Set the second number
        firstNumber = calculate(firstNumber, currentOperator, secondNumber); // Calculate intermediate result
        updateDisplay(firstNumber);
      } else {
        firstNumber = parseFloat(displayValue); // Set the first number
      }
      currentOperator = button.textContent; // Set the selected operator
      isSecondOperand = true; // Ready for the next number
    }
  });
});

// Handle clear button click
clearButton.addEventListener('click', () => {
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  displayValue = '0';
  isSecondOperand = false;
  updateDisplay(displayValue);
});
