Vue.component('stopwatch', {
    template: `
      <div>
        <h5>Cronómetro</h5>
        <div class="mb-2">Tiempo: {{ formattedTime }}</div>
        <input type="number" v-model="alertTime" placeholder="Alerta en segundos" class="form-control mb-2">
        <button @click="start" class="btn btn-primary">Iniciar</button>
        <button @click="stop" class="btn btn-danger">Detener</button>
        <button @click="reset" class="btn btn-secondary">Reiniciar</button>
      </div>
    `,
    data() {
        return {
            time: 0,
            interval: null,
            alertTime: null, // Establecemos el tiempo de alerta predeterminado
            stopped: false // Bandera para rastrear si se detiene el cronómetro
        };
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },
    methods: {
        start() {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    if (!this.stopped) { // Verificamos si el cronómetro está detenido
                        this.time++;
                        if (this.time === parseInt(this.alertTime)) {
                            swal("¡Tiempo de Alerta!", `Han pasado ${this.time} segundos.`);
                            this.stop(); // Detenemos el cronómetro cuando se alcanza el tiempo de alerta
                        }
                    }
                }, 1000);
                swal("Cronómetro Iniciado", `El Tiempo de inicio es: ${this.formattedTime}`);
            }
        },
        stop() {
            clearInterval(this.interval);
            this.interval = null;
            swal("Cronómetro Detenido", `se detuvo en: ${this.formattedTime}`);
            this.stopped = true; // Establecemos la bandera de detenido a true
        },
        reset() {
            this.stop();
            this.time = 0;
            swal("Cronómetro Reiniciado", `Tiempo reiniciado: ${this.formattedTime}`);
            this.stopped = false; // Reiniciamos la bandera de detenido
            this.alertTime = ''; // Limpiamos el campo de alertTime
        }
    }
});


Vue.component('timer', {
    template: `
      <div>
        <h5>Temporizador</h5>
        <div class="mb-2">Tiempo restante: {{ formattedTime }}</div>
        <input v-model="inputTime" placeholder="Segundos" type="number" class="form-control mb-2">
        <button @click="start" class="btn btn-primary">Iniciar</button>
        <button @click="stop" class="btn btn-danger">Detener</button>
        <button @click="reset" class="btn btn-secondary">Reiniciar</button>
      </div>
    `,
    data() {
        return {
            inputTime: 0,
            time: 0,
            interval: null
        };
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },
    methods: {
        start() {
            this.time = this.inputTime;
            if (!this.interval) {
                this.interval = setInterval(() => {
                    if (this.time > 0) {
                        this.time--;
                    } else {
                        this.stop();
                        swal("¡Tiempo terminado!");
                    }
                }, 1000);
                swal("Temporizador Iniciado", `Tiempo: ${this.formattedTime}`);
            }
        },
        stop() {
            clearInterval(this.interval);
            this.interval = null;
            swal("Temporizador Detenido", `Tiempo final: ${this.formattedTime}`);
        },
        reset() {
            this.stop();
            this.time = null;
            swal("Temporizador Reiniciado", `Tiempo final: ${this.formattedTime}`);

            this.inputTime = '';
        }
    }
});

Vue.component('age-calculator', {
    template: `
      <div>
        <h5>Calculadora de Edad</h5>
        <input v-model="birthdate" type="date" class="form-control mb-2">
        <button @click="calculateAge" class="btn btn-primary">Calcular Edad</button>
        <div v-if="age !== null" class="mt-2">Edad: {{ age }} años</div>
      </div>
    `,
    data() {
        return {
            birthdate: '',
            age: null
        };
    },
    methods: {
        calculateAge() {
            if (this.birthdate) {
                const today = new Date();
                const birthDate = new Date(this.birthdate);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                this.age = age;
            } else {
                swal("Por favor, ingrese una fecha de nacimiento válida.");
            }
        }
    }
});

Vue.component('geometry-calculator', {
    template: `
      <div>
        <h5>Cálculo de Áreas y Volúmenes</h5>
        <div class="form-group">
          <label>Forma Geométrica</label>
          <select v-model="shape" class="form-control">
            <option value="square">Cuadrado</option>
            <option value="rectangle">Rectángulo</option>
            <option value="circle">Círculo</option>
            <option value="cylinder">Cilindro</option>
          </select>
        </div>
        <div v-if="shape === 'square'">
          <input v-model.number="side" placeholder="Lado" type="number" class="form-control mb-2">
          <button @click="calculateSquare" class="btn btn-primary">Calcular</button>
          <div v-if="result !== null" class="mt-2">Área: {{ result }} unidades²</div>
        </div>
        <div v-if="shape === 'rectangle'">
          <input v-model.number="length" placeholder="Longitud" type="number" class="form-control mb-2">
          <input v-model.number="width" placeholder="Ancho" type="number" class="form-control mb-2">
          <button @click="calculateRectangle" class="btn btn-primary">Calcular</button>
          <div v-if="result !== null" class="mt-2">Área: {{ result }} unidades²</div>
        </div>
        <div v-if="shape === 'circle'">
          <input v-model.number="radius" placeholder="Radio" type="number" class="form-control mb-2">
          <button @click="calculateCircle" class="btn btn-primary">Calcular</button>
          <div v-if="result !== null" class="mt-2">Área: {{ result }} unidades²</div>
        </div>
        <div v-if="shape === 'cylinder'">
          <input v-model.number="radius" placeholder="Radio" type="number" class="form-control mb-2">
          <input v-model.number="height" placeholder="Altura" type="number" class="form-control mb-2">
          <button @click="calculateCylinder" class="btn btn-primary">Calcular</button>
          <div v-if="result !== null" class="mt-2">Volumen: {{ result }} unidades³</div>
        </div>
      </div>
    `,
    data() {
        return {
            shape: 'square',
            side: 0,
            length: 0,
            width: 0,
            radius: 0,
            height: 0,
            result: null
        };
    },
    methods: {
        calculateSquare() {
            this.result = this.side ** 2;
        },
        calculateRectangle() {
            this.result = this.length * this.width;
        },
        calculateCircle() {
            this.result = Math.PI * this.radius ** 2;
        },
        calculateCylinder() {
            this.result = Math.PI * this.radius ** 2 * this.height;
        }
    }
});

Vue.component('date-converter', {
    template: `
      <div>
        <h5>Conversor de Fechas</h5>
        <input v-model="gregorianDate" type="date" class="form-control mb-2">
        <button @click="convertToJulian" class="btn btn-primary">Convertir a Calendario Juliano</button>
        <div v-if="julianDate" class="mt-2">Fecha Juliana: {{ julianDate }}</div>
      </div>
    `,
    data() {
        return {
            gregorianDate: '',
            julianDate: ''
        };
    },
    methods: {
        convertToJulian() {
            if (this.gregorianDate) {
                const date = new Date(this.gregorianDate);
                const JD = Math.floor((date / 86400000) + 2440587.5);
                this.julianDate = JD;
            } else {
                swal("Por favor, ingrese una fecha válida.");
            }
        }
    }
});
Vue.component('citation-generator', {
    template: `
      <div>
        <label for="format">Formato de cita:</label>
        <select v-model="selectedFormat" class="form-control mb-3">
          <option value="apa">APA 7</option>
          <option value="iso">ISO</option>
        </select>
        <div v-if="selectedFormat === 'apa'">
          <label for="author">Autor(es):</label>
          <input v-model="authors" type="text" class="form-control mb-3">
          <label for="year">Año:</label>
          <input v-model="year" type="number" class="form-control mb-3">
          <label for="title">Título:</label>
          <input v-model="title" type="text" class="form-control mb-3">
        </div>
        <div v-else-if="selectedFormat === 'iso'">
          <label for="author">Autor(es):</label>
          <input v-model="authors" type="text" class="form-control mb-3">
          <label for="title">Título:</label>
          <input v-model="title" type="text" class="form-control mb-3">
          <label for="year">Año:</label>
          <input v-model="year" type="number" class="form-control mb-3">
        </div>
        <label for="link">Enlace:</label>
        <input v-model="link" type="url" class="form-control mb-3">
        <button @click="generateCitation" class="btn btn-primary">Generar Cita</button>
        <div v-if="citation" class="mt-3">
          <h5>Cita Generada:</h5>
          <p>{{ citation }}</p>
        </div>
      </div>
    `,
    data() {
        return {
            selectedFormat: 'apa',
            authors: '',
            year: '',
            title: '',
            link: '',
            citation: ''
        };
    },
    methods: {
        generateCitation() {
            let formattedAuthors = this.formatAuthors(this.authors);
            if (this.selectedFormat === 'apa') {
                this.citation = `APA 7: ${formattedAuthors}. (${this.year}). ${this.title}. Recuperado de ${this.link}.`;
            } else if (this.selectedFormat === 'iso') {
                this.citation = `ISO: ${formattedAuthors}. "${this.title}". ${this.year}. Disponible en: ${this.link}.`;
            }
        },
        formatAuthors(authors) {
            // Formatear nombres de autores según las convenciones del formato APA
            let formattedAuthors = authors.split(',').map(author => {
                let names = author.trim().split(' ');
                let lastName = names[names.length - 1];
                let initials = names.slice(0, names.length - 1).map(name => name.charAt(0)).join('. ');
                return `${lastName}, ${initials}`;
            }).join(', ');
            return formattedAuthors;
        }
    }
});



new Vue({
    el: '#app',
    data() {
        return {
            theme: 'light',
            components: [
                { name: 'stopwatch', title: 'Cronómetro' },
                { name: 'timer', title: 'Temporizador' },
                { name: 'age-calculator', title: 'Calculadora de Edad' },
                { name: 'geometry-calculator', title: 'Cálculo de Áreas y Volúmenes' },
                { name: 'date-converter', title: 'Conversor de Fechas' },
            ]
        };
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    }
});
