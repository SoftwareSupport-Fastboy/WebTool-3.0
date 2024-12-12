let history = []; // Array to store history

let appendEnabled = true; // Control flag for append functionality

function appendToDisplay(value) {
if (!appendEnabled) return; // Check if appending is enabled

const display = document.getElementById('input_calculator_ID');
const lastChar = display.value[display.value.length - 1];

// Prevent entering multiple operators or multiple decimals in one number
if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) return;
if (value === '.' && lastChar === '.') return;

display.value += value;
clearError(); // Clear any existing error when typing

display.scrollLeft = display.scrollWidth;
}

function disableAppend() {
appendEnabled = false; // Disable appending when input is focused
}

function enableAppend() {
appendEnabled = true; // Enable appending when input is blurred
}

function clearDisplay() {
document.getElementById('input_calculator_ID').value = ''; // Clears all input
clearError(); // Clear any existing error
}

function clearError() {
document.getElementById('error-message').innerText = 'ㅤ'; // Clear error message
}

function showError(message) {
const errorMessage = document.getElementById('error-message');
errorMessage.innerText = message; // Set the error message
}

function calculate() {
const display = document.getElementById('input_calculator_ID');
const expression = display.value;

// Check for division by zero
if (expression.includes('/0')) {
    showError('Cannot divide by zero');
    return;
}

try {
    const result = eval(expression);
    display.value = result;
    clearError(); // Clear error if calculation is successful

    // Add to history
    addToHistory(`${expression} = ${result}`);
} catch {
    showError('Please recheck your math'); // Show error if calculation fails
}
}

function addToHistory(entry) {
history.unshift(entry); // Add entry to the start of the history array
updateHistoryDisplay(); // Update the history display
}

function updateHistoryDisplay() {
const historyContainer = document.getElementById('history-of-calculator');
historyContainer.innerHTML = history.map(item => `<div>${item}</div>`).join(''); // Display history
historyContainer.scrollTop = 0; // Scroll to the top
}

function backspace() {
const display = document.getElementById('input_calculator_ID');
display.value = display.value.slice(0, -1); // Remove last character
clearError(); // Clear error when editing
}

document.addEventListener('keydown', function(event) {
const key = event.key;

if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
    appendToDisplay(key);
} else if (key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    calculate(); // Call calculate on Enter
} else if (key === 'Backspace') {
    backspace(); // Call backspace function
} else if (key === 'Escape' || key === 'Escape') {
    clearDisplay(); // Clear all input
}
});
