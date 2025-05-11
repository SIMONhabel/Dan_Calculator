// Najdeme display div
const display = document.getElementById('display');
const pi = 3.141592653589793

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
    let expr = display.innerText;

    // Náhrady symbolů za funkční výrazy
    expr = expr.replace(/π/g, pi);
    expr = expr.replace(/sin\(/g, 'mySin(');
    expr = expr.replace(/cos\(/g, 'myCos(');
    expr = expr.replace(/log\(/g, 'myLog10(');


    if (/\/0(?!\d)/.test(expr)) {
      alert('Chyba: dělení nulou!');
      return;
    }

    const result = eval(expr);
    display.innerText = result;
  } catch (err) {
    alert('Chyba ve výrazu! ' + err);
  }
}


// Vymazání
function clearDisplay() {
  display.innerText = '';
}

// Použití klávesnice
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
  else if (e.key === ')') Close();
  else if (e.key === '(') Open()
 
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

function Pi() {
  display.innerText += 'π';
} 


function Close() {
  display.innerText += ')';
}

function Open() {
  display.innerText += '(';
}

function log() {
  display.innerText += 'log(';
}

function sin() {
  display.innerText += 'sin(';
}

function cos() {
  display.innerText += 'cos('
}

function degToRad(deg) {
  return deg * (pi / 180);
}

function myPow(base, exp) {
  let result = 1;
  for (let i = 0; i < exp; i++) {
    result *= base;
  }
  return result;
}

function mySin(deg) {
  const x = degToRad(deg);
  let result = 0;
  let sign = 1;
  for (let i = 0; i < 10; i++) {
    const exponent = 2 * i + 1;
    let term = 1;
    for (let j = 1; j <= exponent; j++) {
      term *= x / j;
    }
    result += sign * term;
    sign *= -1;
  }
  return roundNearZero(result);
}

function myCos(deg) {
  const x = degToRad(deg);
  let result = 0;
  let sign = 1;
  for (let i = 0; i < 10; i++) {
    const exponent = 2 * i;
    let term = 1;
    for (let j = 1; j <= exponent; j++) {
      term *= x / j;
    }
    result += sign * term;
    sign *= -1;
  }
  return roundNearZero(result);
}


function myLog(x) {
  if (x <= 0) throw 'Logaritmus záporného čísla nebo nuly!';
  let y = (x - 1) / (x + 1);
  let y2 = y * y;
  let result = 0;
  for (let i = 1; i <= 19; i += 2) {
    result += (1 / i) * myPow(y, i);
  }
  return 2 * result;
}

function myLog10(x) {
  return myLog(x) / myLog(10);
}


function myAbs(x) {
  return x < 0 ? -x : x;
}

function roundNearZero(x, epsilon = 1e-10) {
  return myAbs(x) < epsilon ? 0 : x;
}

function degToRad(deg) {
  return deg * (pi / 180);
}

function alt() {
  window.open("https://bsodmaker.net/");
}

function terminate() {
  window.open("https://blackscreen.app/");
}

let memory = 0;

function memoryAdd() {
  try {
    memory += eval(display.innerText || '0');
  } catch {
    alert("Chyba v M+");
  }
}

function memorySubtract() {
  try {
    memory -= eval(display.innerText || '0');
  } catch {
    alert("Chyba v M-");
  }
}

function memoryRecall() {
  display.innerText += memory.toString();
}

function memoryClear() {
  memory = 0;
}
