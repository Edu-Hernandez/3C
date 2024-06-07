

// Función para cambiar entre temas claro y oscuro
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Guardar la preferencia del usuario en localStorage
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// Verificar la preferencia del usuario al cargar la página
window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme(); // Cambiar al tema oscuro si está guardado
    }
};

// Agregar evento al botón de cambiar tema
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', toggleTheme);


let display = document.getElementById('display');
let currentOperand = '';

function appendNumber(number) {
    if (display.innerText === '0' || display.innerText === 'Error') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
    currentOperand += number;
}

function operate(operator) {
    display.innerText += ` ${operator} `;
    currentOperand += ` ${operator} `;
}

function calculate() {
    try {
        display.innerText = eval(currentOperand);
        currentOperand = display.innerText;
    } catch (error) {
        display.innerText = 'Error';
        currentOperand = '';
    }
}

function clearDisplay() {
    display.innerText = '0';
    currentOperand = '';
}

function openPercentageDialog() {
    $('#percentageModal').modal('show');
}

function calculatePercentage() {
    try {
        let percent = parseFloat(document.getElementById('percentageInput').value);
        let number = parseFloat(document.getElementById('numberInput').value);
        let result = (percent / 100) * number;
        display.innerText = result;
        currentOperand = result;
        $('#percentageModal').modal('hide');
    } catch (error) {
        display.innerText = 'Error';
        currentOperand = '';
    }
}

function calculateBMI() {
    let weight = prompt("Ingrese su peso en kilogramos:");
    let height = prompt("Ingrese su altura en metros:");
    let bmi = weight / (height * height);
    display.innerText = `BMI: ${bmi.toFixed(2)}`;
}


function convert() {
    let fromUnit = document.getElementById('fromUnit').value;
    let toUnit = document.getElementById('toUnit').value;
    let fromValue = parseFloat(document.getElementById('fromValue').value);
    let result;

    // Conversión de unidades
    switch (fromUnit) {
        case 'cm':
            if (toUnit === 'm') result = fromValue / 100;
            else if (toUnit === 'in') result = fromValue / 2.54;
            else if (toUnit === 'ft') result = fromValue / 30.48;
            break;
        case 'm':
            if (toUnit === 'cm') result = fromValue * 100;
            else if (toUnit === 'in') result = fromValue * 39.37;
            else if (toUnit === 'ft') result = fromValue * 3.281;
            break;
        case 'in':
            if (toUnit === 'cm') result = fromValue * 2.54;
            else if (toUnit === 'm') result = fromValue * 0.0254;
            else if (toUnit === 'ft') result = fromValue / 12;
            break;
        case 'ft':
            if (toUnit === 'cm') result = fromValue * 30.48;
            else if (toUnit === 'm') result = fromValue * 0.3048;
            else if (toUnit === 'in') result = fromValue * 12;
            break;
        default:
            result = 'Error';
    }

    // Mostrar el resultado
    if (!isNaN(result)) {
        document.getElementById('result').value = result.toFixed(2);
    } else {
        document.getElementById('result').value = 'Error';
    }
}