// Referencias al DOM
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const animeResults = document.getElementById("animeResults");

// Mostrar estado de carga
function showLoading() {
  loading.style.display = "block";
  errorDiv.style.display = "none";
  animeResults.innerHTML = "";
}

// Mostrar error
function showError(message) {
  loading.style.display = "none";
  errorDiv.style.display = "block";
  errorDiv.textContent = message;
}

// Obtener lista de animes desde la API Jikan
async function fetchAnimes() {
  showLoading();

  try {
    const response = await fetch("https://api.jikan.moe/v4/anime");

    if (!response.ok) {
      throw new Error("Error fetching animes");
    }

    const result = await response.json();
    renderAnimes(result.data);
  } catch (error) {
    showError("Something went wrong ❌");
  } finally {
    loading.style.display = "none";
  }
}

// Renderizar animes en pantalla
function renderAnimes(animes) {
  animeResults.innerHTML = "";

  animes.forEach((anime) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <img src="${anime.images.large_image_url}" alt="${anime.title}" width="200">
      <h3>${anime.title}</h3>
      <p>${anime.synopsis || "No synopsis available"}</p>
      <a href="detail.html?id=${anime.mal_id}">
        <button>View details</button>
      </a>
    `;

    animeResults.appendChild(card);
  });
}

// Ejecutar al cargar la página
fetchAnimes();
