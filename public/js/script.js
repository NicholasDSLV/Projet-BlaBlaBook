console.log("script.js chargé");

// --------- Années ---------
const yearSelect = document.getElementById("yearSelect");

if (yearSelect) {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  }
}

// --------- Genres ---------
const genreSelect = document.getElementById("genreSelect");

if (genreSelect) {
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

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;          // important si tu veux récupérer la valeur
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

// --------- Flash message ---------
const flash = document.getElementById("flash");

if (flash) {
  setTimeout(() => {
    flash.classList.add("hide");
    setTimeout(() => flash.remove(), 500);
  }, 4000);
}

// --------- Confettis ---------


const welcome = document.querySelector(".welcome-message");

if (welcome) {

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("span");
    confetti.classList.add("confetti");

    // directions aléatoires
    confetti.style.setProperty("--x", Math.random());
    confetti.style.setProperty("--y", Math.random());
    confetti.style.background = randomColor();

    welcome.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

function randomColor(){
  const colors = ["#667EEA", "#764BA2", "#22c55e", "#facc15", "#ec4899"];
  return colors[Math.floor(Math.random() * colors.length)];
}
