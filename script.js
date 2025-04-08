const display = document.getElementById('display');

    function appendNumber(number) {
      display.innerText += number;
    }

    function appendOperator(operator) {
      if (display.innerText === '' && operator !== '-') return;
      const lastChar = display.innerText.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        display.innerText = display.innerText.slice(0, -1);
      }
      display.innerText += operator;
    }

    function calculate() {
      try {
        display.innerText = eval(display.innerText);
      } catch (error) {
        alert('Chyba v zadání!');
      }
    }

    function clearDisplay() {
      display.innerText = '';
    }

    document.addEventListener('keydown', (event) => {
      const key = event.key;
      const lowerKey = key.toLowerCase();

      // Najdi tlačítko podle data-key
      const button = document.querySelector(`button[data-key="${lowerKey}"]`);
      if (button) {
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 150);
      }

      if (!isNaN(key)) {
        appendNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        display.innerText = display.innerText.slice(0, -1);
      } else if (key === '.' || key === ',') {
        appendNumber('.');
      } else if (lowerKey === 'c') {
        clearDisplay();
      }
    });