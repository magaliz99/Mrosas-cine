
// ============================================
// DATOS ESTÁTICOS - PELÍCULAS Y HORARIOS
// ============================================

const movies = [
    {
        id: 1,
        title: "Fantastic Mr. Fox",
        genre: "Comedia, Animación",
        description: "Tres malvados granjeros le declaran la guerra a un zorro y este anima a sus vecinos animales a defenderse.",
        showtimes: ["14:30", "17:00", "19:30", "22:00"],
        image: "images/mrfox.jpeg"
    },
    {
        id: 2,
        title: "Un monstruo en Paris",
        genre: "Musical, Animación",
        description: "Raoul y Emile accidentalmente liberan a un monstruo del excéntrico invernadero de un científico e intentan atraparlo.",
        showtimes: ["15:00", "18:00", "20:30"],
        image: "images/paris.jpeg"
    },
    {
        id: 3,
        title: "Mi vecino Totoro",
        genre: "Fantasia, Aventura",
        description: "Satsuki y Mei se mudan al campo con su padre mientras su madre se recupera en un hospital cercano. Explorando su nuevo hogar, descubren un mundo invisible para los adultos, habitado por espíritus del bosque.",
        showtimes: ["16:00", "18:30", "21:00", "23:30"],
        image: "images/totoro.jpeg"
    },
    {
        id: 4,
        title: "La sociedad de los poetas muertos",
        genre: "Comedia, Drama",
        description: "Un maestro en un colegio privado emplea métodos poco convencionales para inspirar las vidas de sus estudiantes.",
        showtimes: ["13:30", "15:30", "17:30", "20:00"],
        image: "images/sociedadpoetas.jpeg"
    },
    {
        id: 5,
        title: "Orgullo y Prejuicio",
        genre: "Romance, Comedia",
        description: "Elizabeth Bennet conoce al apuesto y adinerado Sr. Darcy, con quien, rápidamente, inicia una intensa y compleja dinámica.",
        showtimes: ["15:45", "18:15", "20:45", "23:00"],
        image: "images/prejuicio.jpeg"
    },
    {
        id: 6,
        title: "Interestelar",
        genre: "Ciencia Ficción, Aventura",
        description: "Gracias a un descubrimiento, un grupo de científicos y exploradores se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
        showtimes: ["14:00", "16:30", "19:00", "21:30"],
        image: "images/interestelar.jpeg"
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
        <img 
            class="movie-card-image" 
            src="${movie.image}" 
            alt="Póster de ${movie.title}"
        >

        <div class="movie-card-content">
            <div class="movie-card-header">
                <h3 class="movie-card-title">${movie.title}</h3>
                <span class="movie-card-genre">${movie.genre}</span>
            </div>

            <p class="movie-card-description">
                ${movie.description}
            </p>

            <p class="movie-card-showtimes">
                ${showtimesCount} ${showtimesText} disponibles
            </p>

            <button class="btn-select-movie" data-movie-id="${movie.id}">
                Seleccionar
            </button>
        </div>
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

    document.getElementById('selectedMovieTitle').textContent = movie.title;
    document.getElementById('selectedMovieDescription').textContent = movie.description;

    renderShowtimes(movie.showtimes);

    document.getElementById('quantityInput').value = ticketQuantity;

    document.getElementById('moviesGrid').parentElement.style.display = 'none';
    document.getElementById('movieDetailsSection').style.display = 'block';
    document.getElementById('confirmationSection').style.display = 'none';

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

            document.querySelectorAll('.btn-showtime').forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
            selectedShowtime = showtime;

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
    document.getElementById('summaryMovie').textContent = selectedMovie.title;
    document.getElementById('summaryShowtime').textContent = selectedShowtime;
    document.getElementById('summaryQuantity').textContent = ticketQuantity;

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

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
