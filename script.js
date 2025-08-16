const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '0';

function updateDisplay() {
  display.textContent = currentInput;
}

function calculate() {
  try {
    currentInput = eval(
      currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
    ).toString();
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent;

    if (value === 'AC') {
      currentInput = '0';
    } else if (value === '⌫' || value === '±') {
      // ± toggles sign
      if (!isNaN(currentInput)) {
        currentInput = (parseFloat(currentInput) * -1).toString();
      }
    } else if (value === '%') {
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === '=') {
      calculate();
    } else {
      if (currentInput === '0' && !isNaN(value)) {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
    updateDisplay();
  });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    if (currentInput === '0') currentInput = key;
    else currentInput += key;
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1) || '0';
  } else if (key.toLowerCase() === 'c') {
    currentInput = '0';
  }
  updateDisplay();
});