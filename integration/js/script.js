//---------selecteur pour le menu déroulant des années---------------------------------------
const yearSelect = document.getElementById("yearSelect");

// Définir l'année de début et l'année actuelle
const currentYear = new Date().getFullYear();
const startYear = 1900; // par exemple, ou ce que tu veux comme début

// Boucler de l'année de début jusqu'à l'année actuelle
for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}


//---------selecteur pour le menu déroulant des genres---------------------------------------

const genres = [
    "Roman", "Roman policier", "Thriller", "Science-fiction",
    "Fantasy", "Fantastique", "Horreur", "Aventure",
    "Historique", "Biographie", "Autobiographie", "Essai",
    "Philosophie", "Psychologie", "Développement personnel",
    "Poésie", "Théâtre", "Jeunesse", "BD / Manga",
    "Documentaire", "Science", "Politique", "Économie",
    "Histoire", "Art", "Musique", "Cuisine", "Voyage",
    "Religion / Spiritualité"
];

const select = document.getElementById("genreSelect");

genres.forEach(genre => {
    const option = document.createElement("option");
    option.textContent = genre;
    select.appendChild(option);
});
