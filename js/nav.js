// Espera a que el documento esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de la barra de navegación
    var navbarToggler = document.querySelector('.navbar-toggler');
    
    // Selecciona el contenedor de la barra de navegación
    var navbarCollapse = document.querySelector('.navbar-collapse');

    // Agrega un evento de clic al botón de la barra de navegación
    navbarToggler.addEventListener('click', function() {
        // Alternar la clase 'show' en el contenedor de la barra de navegación
        navbarCollapse.classList.toggle('show');
    });

    // Agrega un evento de clic a los enlaces de la barra de navegación
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function() {
            // Remueve la clase 'show' del contenedor de la barra de navegación
            navbarCollapse.classList.remove('show');
        });
    });
});
