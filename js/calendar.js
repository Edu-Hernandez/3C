

        // Almacenar notas
        var notes = {
            '2024-06-01': 'Nota 1',
            '2024-06-10': 'Nota 2'
        };

        // Función para mostrar el calendario
        function showCalendar() {
            $('#calendar').show();
            $('#calendar-container').fullCalendar('renderEvents');
        }


        // Funciones para mostrar/ocultar vistas
        function showCalculator() {
            $('#calendar').hide();
        }

        function showImageUploader() {
            $('#calendar').hide();
        }

        // Función para mostrar el formulario emergente para agregar notas
        function showNoteModal(date) {
            $('#noteDate').val(date.format('YYYY-MM-DD'));
            if (notes[date.format('YYYY-MM-DD')]) {
                $('#noteTitle').val(notes[date.format('YYYY-MM-DD')]);
            } else {
                $('#noteTitle').val('');
            }
            $('#noteModal').modal('show');
        }

        // Función para guardar la nota
        function saveNote() {
            var title = $('#noteTitle').val();
            var date = $('#noteDate').val();
            notes[date] = title;
            $('#calendar-container').fullCalendar('renderEvent', {
                title: title,
                start: date
            }, true);
            $('#noteModal').modal('hide');
            swal("¡Nota guardada!", "Se ha guardado la nota para esta fecha.", "success");
        }

        // Función para alternar entre el modo claro y oscuro
        function toggleDarkMode() {
            $('body').toggleClass('dark-mode');
        }

        // JavaScript para el calendario
        $(document).ready(function () {
            $('#calendar-container').fullCalendar({
                // Configuración del calendario
                // Puedes añadir eventos con notas aquí
                defaultView: 'month',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                eventLimit: true,
                events: Object.keys(notes).map(function (date) {
                    return {
                        title: notes[date],
                        start: date
                    };
                }),
                dayClick: function (date, jsEvent, view) {
                    showNoteModal(date);
                }
            });
        });