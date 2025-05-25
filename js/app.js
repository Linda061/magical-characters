const container = document.getElementById("characters-container");
const filter = document.getElementById("house-filter");
const loadBtn = document.getElementById("load-more-btn");

let allData = [];
let filteredData = [];
let currentIndex = 0;
const itemsPerPage = 16;

fetch("https://hp-api.onrender.com/api/characters")
  .then(res => res.json())
  .then(data => {
    allData = data;
    filteredData = data;
    renderCards(filteredData);
  })
  .catch(err => {
    container.innerHTML = "<p>Error loading characters.</p>";
    console.error("Fetch error:", err);
  });

function renderCards(data) {
  const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);

  nextItems.forEach(character => {
    const card = document.createElement("div");
    card.className = "character-card";

    const img = character.image || "images/not-found.png";
    const house = character.house || "Unknown";
    const birth = character.dateOfBirth || "Unknown";

    card.innerHTML = `
      <img src="${img}" alt="${character.name}" onerror="this.src='images/not-found.png';" />
      <h3>${character.name}</h3>
      <p>House: ${house}</p>
      <p>Date of Birth: ${birth}</p>
    `;

    container.appendChild(card);
  });

  currentIndex += itemsPerPage;

  if (currentIndex >= data.length) {
    loadBtn.style.display = "none";
  } else {
    loadBtn.style.display = "block";
  }
}

filter.addEventListener("change", () => {
  const selected = filter.value;
  container.innerHTML = "";
  currentIndex = 0;

  if (selected === "all") {
    filteredData = allData;
  } else {
    filteredData = allData.filter(c => c.house === selected);
  }

  renderCards(filteredData);
});

loadBtn.addEventListener("click", () => {
  renderCards(filteredData);
});
