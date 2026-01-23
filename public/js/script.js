// pour supprimer un article avec le bouton retirer //

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".article__button--remove");
  if (!btn) return;

  console.log("Bouton Retirer cliqué");
  if (confirm("Retirer ce livre de la bibliothèque ?")) {
    btn.closest(".article").remove();
  }
});


// Fin du script pour supprimer un article //


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

//---------fin du selecteur pour le menu déroulant des genres---------------------------------------

// -------------------------DARKMODE---------------------------------- //

 const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  function updateIcon(){
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  }

  btn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });

  updateIcon();