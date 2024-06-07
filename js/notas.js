


    //Escribe aquí el código
    function calcularPromedio() {
        var nota1 = document.getElementById('nota1').value;
        var nota2 = document.getElementById('nota2').value;
        var nota3 = document.getElementById('nota3').value;
        var mensaje = document.getElementById('mensaje');

        mensaje.innerText = ''; // Limpiar mensajes previos

        if (nota1 === "" || nota2 === "" || nota3 === "") {
            mensaje.innerText = "Por favor, completa todas las notas.";
            return;
        }

        nota1 = parseFloat(nota1);
        nota2 = parseFloat(nota2);
        nota3 = parseFloat(nota3);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 0 || nota1 > 20 || nota2 < 0 || nota2 > 20 || nota3 < 0 || nota3 > 20) {
            mensaje.innerText = 'Las notas deben ser números entre 0 y 20.';
            return;
        }

        var promedio = (nota1 + nota2 + nota3) / 3;

        var rango;
        if (promedio >= 18 && promedio <= 20) {
            rango = 'A+';
        } else if (promedio >= 14 && promedio <= 17) {
            rango = 'A';
        } else if (promedio >= 11 && promedio <= 13) {
            rango = 'B';
        } else {
            rango = 'C';
        }

        var aprobado = promedio >= 11 ? 'Sí' : 'No';

        // Mostrar resultados
        document.getElementById('resultado').innerText = 'Promedio: ' + promedio.toFixed(2);
        document.getElementById('rango').innerText = 'Rango: ' + rango;
        document.getElementById('aprobado').innerText = 'Aprobado: ' + aprobado;
    }

    function limpiardatos() {
        document.getElementById('nota1').value = '';
        document.getElementById('nota2').value = '';
        document.getElementById('nota3').value = '';
        document.getElementById('resultado').innerText = '';
        document.getElementById('aprobado').innerText = '';
        document.getElementById('rango').innerText = '';
        document.getElementById('mensaje').innerText = '';
    }

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
