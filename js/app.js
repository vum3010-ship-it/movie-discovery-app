const movies = [
    {
        title: "The Batman",
        year: 2022,
        genres: ["Hành động", "Tội phạm"],
        poster: "images/batman.jpg",
        description: "Người dơi đối đầu thế giới ngầm Gotham.",
        director: "Matt Reeves",
        actors: "Robert Pattinson"
    },
    {
        title: "Inception",
        year: 2010,
        genres: ["Khoa học", "Hành động"],
        poster: "images/inception.jpg",
        description: "Giấc mơ trong giấc mơ.",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio"
    },
    {
        title: "Titanic",
        year: 1997,
        genres: ["Tình cảm"],
        poster: "images/titanic.jpg",
        description: "Câu chuyện tình trên con tàu định mệnh.",
        director: "James Cameron",
        actors: "Kate Winslet"
    }
];

const movieList = document.getElementById("movieList");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("searchInput");

/* Render movies */
function renderMovies(list) {
    movieList.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.poster}">
            <h4>${movie.title} (${movie.year})</h4>
        `;
        card.onclick = () => openModal(movie);
        movieList.appendChild(card);
    });
}

/* Genres */
const genres = [...new Set(movies.flatMap(m => m.genres))];
genres.forEach(g => {
    genreFilters.innerHTML += `
        <label>
            <input type="checkbox" value="${g}">
            ${g}
        </label><br>
    `;
});

/* Filter logic */
function filterMovies() {
    const keyword = searchInput.value.toLowerCase();
    const checked = [...genreFilters.querySelectorAll("input:checked")]
        .map(c => c.value);

    let result = movies.filter(m =>
        m.title.toLowerCase().includes(keyword)
    );

    if (checked.length) {
        result = result.filter(m =>
            checked.some(g => m.genres.includes(g))
        );
    }
    renderMovies(result);
}

/* Debounce */
let timer;
searchInput.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(filterMovies, 400);
});

genreFilters.addEventListener("change", filterMovies);

/* Modal */
const modal = document.getElementById("movieModal");
function openModal(m) {
    modal.classList.remove("hidden");
    modalPoster.src = m.poster;
    modalTitle.textContent = m.title;
    modalDesc.textContent = m.description;
    modalDirector.textContent = m.director;
    modalActors.textContent = m.actors;
}
document.querySelector(".close").onclick = () =>
    modal.classList.add("hidden");

/* Dark mode */
const toggle = document.getElementById("themeToggle");
toggle.checked = localStorage.getItem("theme") === "dark";
document.body.classList.toggle("dark-mode", toggle.checked);

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
});

renderMovies(movies);