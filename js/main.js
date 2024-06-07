function showAlert() {
    Swal.fire({
        title: '¡Hola!',
        text: 'Esta es una alerta de SweetAlert2',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Lógica para cambiar el tema
document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});
