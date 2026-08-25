// ============================================
// DATOS ESTÁTICOS - PELÍCULAS Y HORARIOS
// ============================================

const movies = [
    {
        id: 1,
        title: "El Viaje Infinito",
        genre: "Ciencia Ficción",
        description: "Una aventura épica a través de dimensiones paralelas y mundos desconocidos.",
        showtimes: ["14:30", "17:00", "19:30", "22:00"]
    },
    {
        id: 2,
        title: "Corazones en Silencio",
        genre: "Drama",
        description: "Una historia de amor que desafía los límites del tiempo y la distancia.",
        showtimes: ["15:00", "18:00", "20:30"]
    },
    {
        id: 3,
        title: "La Sombra del Misterio",
        genre: "Suspenso",
        description: "Un thriller psicológico que te mantendrá al borde del asiento hasta el final.",
        showtimes: ["16:00", "18:30", "21:00", "23:30"]
    },
    {
        id: 4,
        title: "Risa Garantizada",
        genre: "Comedia",
        description: "La película más divertida del año. Prepárate para reír sin parar.",
        showtimes: ["13:30", "15:30", "17:30", "20:00"]
    },
    {
        id: 5,
        title: "Héroes del Pasado",
        genre: "Acción",
        description: "Explosiones, persecuciones y adrenalina pura en una aventura inolvidable.",
        showtimes: ["15:45", "18:15", "20:45", "23:00"]
    },
    {
        id: 6,
        title: "Fantasía Encantada",
        genre: "Fantasía",
        description: "Un mundo mágico lleno de criaturas fantásticas y secretos por descubrir.",
        showtimes: ["14:00", "16:30", "19:00", "21:30"]
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let selectedMovie = null;
let selectedShowtime = null;
let ticketQuantity = 1;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    setupEventListeners();
});

// ============================================
// RENDERIZAR PELÍCULAS
// ============================================

function renderMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// ============================================
// CREAR TARJETA DE PELÍCULA
// ============================================

function createMovieCard(movie) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.setAttribute('role', 'article');

    const showtimesCount = movie.showtimes.length;
    const showtimesText = showtimesCount === 1 ? 'horario' : 'horarios';

    card.innerHTML = `
        <div class="movie-card-header">
            <h3 class="movie-card-title">${movie.title}</h3>
            <span class="movie-card-genre">${movie.genre}</span>
        </div>
        <p class="movie-card-description">${movie.description}</p>
        <p class="movie-card-showtimes">${showtimesCount} ${showtimesText} disponibles</p>
        <button class="btn-select-movie" data-movie-id="${movie.id}">
            Seleccionar
        </button>
    `;

    card.querySelector('.btn-select-movie').addEventListener('click', () => {
        selectMovie(movie);
    });

    return card;
}

// ============================================
// SELECCIONAR PELÍCULA
// ============================================

function selectMovie(movie) {
    selectedMovie = movie;
    selectedShowtime = null;
    ticketQuantity = 1;

    // Actualizar información de película seleccionada
    document.getElementById('selectedMovieTitle').textContent = movie.title;
    document.getElementById('selectedMovieDescription').textContent = movie.description;

    // Renderizar horarios
    renderShowtimes(movie.showtimes);

    // Actualizar cantidad de entradas
    document.getElementById('quantityInput').value = ticketQuantity;

    // Mostrar sección de detalles, ocultar películas y confirmación
    document.getElementById('moviesGrid').parentElement.style.display = 'none';
    document.getElementById('movieDetailsSection').style.display = 'block';
    document.getElementById('confirmationSection').style.display = 'none';

    // Desactivar botón confirmar hasta seleccionar horario
    updateConfirmButton();
}

// ============================================
// RENDERIZAR HORARIOS
// ============================================

function renderShowtimes(showtimes) {
    const container = document.getElementById('showtimesContainer');
    container.innerHTML = '';

    showtimes.forEach(showtime => {
        const button = document.createElement('button');
        button.className = 'btn-showtime';
        button.textContent = showtime;
        button.setAttribute('aria-label', `Horario ${showtime}`);

        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.btn-showtime').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase active al botón seleccionado
            button.classList.add('active');
            selectedShowtime = showtime;

            // Actualizar estado del botón confirmar
            updateConfirmButton();
        });

        container.appendChild(button);
    });
}

// ============================================
// CONFIGURAR EVENT LISTENERS
// ============================================

function setupEventListeners() {
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');
    const newReservationBtn = document.getElementById('newReservationBtn');

    decreaseBtn.addEventListener('click', decreaseTickets);
    increaseBtn.addEventListener('click', increaseTickets);
    confirmBtn.addEventListener('click', confirmReservation);
    backBtn.addEventListener('click', backToMovies);
    newReservationBtn.addEventListener('click', newReservation);
}

// ============================================
// CONTROLAR CANTIDAD DE ENTRADAS
// ============================================

function decreaseTickets() {
    if (ticketQuantity > 1) {
        ticketQuantity--;
        document.getElementById('quantityInput').value = ticketQuantity;
    }
}

function increaseTickets() {
    ticketQuantity++;
    document.getElementById('quantityInput').value = ticketQuantity;
}

// ============================================
// ACTUALIZAR ESTADO DEL BOTÓN CONFIRMAR
// ============================================

function updateConfirmButton() {
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (selectedShowtime) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

// ============================================
// CONFIRMAR RESERVA
// ============================================

function confirmReservation() {
    // Mostrar resumen
    document.getElementById('summaryMovie').textContent = selectedMovie.title;
    document.getElementById('summaryShowtime').textContent = selectedShowtime;
    document.getElementById('summaryQuantity').textContent = ticketQuantity;

    // Cambiar vistas
    document.getElementById('movieDetailsSection').style.display = 'none';
    document.getElementById('confirmationSection').style.display = 'block';
}

// ============================================
// VOLVER A PELÍCULAS
// ============================================

function backToMovies() {
    selectedMovie = null;
    selectedShowtime = null;
    ticketQuantity = 1;

    document.getElementById('movieDetailsSection').style.display = 'none';
    document.getElementById('confirmationSection').style.display = 'none';
    document.getElementById('moviesGrid').parentElement.style.display = 'block';

    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// NUEVA RESERVA
// ============================================

function newReservation() {
    selectedMovie = null;
    selectedShowtime = null;
    ticketQuantity = 1;

    document.getElementById('confirmationSection').style.display = 'none';
    document.getElementById('moviesGrid').parentElement.style.display = 'block';

    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
