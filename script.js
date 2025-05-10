// Najdeme display div
const display = document.getElementById('display');

// Načtení a aplikace tématu (výchozí light)
const themeCheckbox = document.querySelector('.theme-switch__checkbox');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeCheckbox.checked = true;
}
themeCheckbox.addEventListener('change', () => {
  if (themeCheckbox.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

// Vkládání číslic
function appendNumber(num) {
  display.innerText += num;
}

// Vkládání operátorů
function appendOperator(op) {
  // nepřipustíme dva operátory za sebou (kromě minus jako první)
  const text = display.innerText;
  if (text === '' && op !== '-') return;
  if (['+', '-', '*', '/'].includes(text.slice(-1))) {
    display.innerText = text.slice(0, -1);
  }
  display.innerText += op;
}

// Výpočet
function calculate() {
  try {
    const expr = display.innerText;
    if (/\/0(?!\d)/.test(expr)) {
      alert('Chyba: dělení nulou!');
      return;
    }
    const result = eval(expr);
    display.innerText = result;
  } catch {
    alert('Chyba ve výrazu!');
  }
}

// Vymazání
function clearDisplay() {
  display.innerText = '';
}

// Klávesové zkratky
document.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  const btn = document.querySelector(`button[data-key="${key}"]`);
  if (btn) {
    btn.classList.add('pressed');
    setTimeout(()=>btn.classList.remove('pressed'), 150);
  }
  if (!isNaN(e.key)) appendNumber(e.key);
  else if ('+-*/'.includes(e.key)) appendOperator(e.key);
  else if (e.key === 'Enter') { e.preventDefault(); calculate(); }
  else if (e.key === 'Backspace') display.innerText = display.innerText.slice(0, -1);
  else if (e.key === '.' || e.key === ',') appendNumber('.');
  else if (key === 'c' || key === 'escape') clearDisplay();
  else if (e.key === '^') appendPower();
  else if (e.key === ')') close();
});

// Vkládání mocniny jako **
function appendPower() {
  const text = display.innerText;
  // Nepřipustíme dvě ** za sebou
  if (text.endsWith('**')) return;
  // Pokud poslední znak je operátor, nahradíme ho
  if (['+', '-', '*', '/', '^'].includes(text.slice(-1))) {
    display.innerText = text.slice(0, -1);
  }
  display.innerText += '**';
}

// Vkládání odmocniny jako **(1/
function appendRoot() {
  const text = display.innerText;
  if (text === '' || ['+', '-', '*', '/', '**', '('].includes(text.slice(-1))) return;
  display.innerText += '**(1/';
}

// Vkládání zavírací závorky
function Close() {
  display.innerText += ')';
}
