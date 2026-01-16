// Sélectionner le <select> par son id
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