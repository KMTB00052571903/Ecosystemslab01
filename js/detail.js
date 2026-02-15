// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

// Referencias al DOM
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const detail = document.getElementById("detail");

// Obtener detalle del anime
async function fetchAnimeDetail() {
  if (!animeId) {
    errorDiv.textContent = "Anime not found 📭";
    loading.style.display = "none";
    return;
  }

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/full`
    );

    if (!response.ok) {
      throw new Error("Error loading anime");
    }

    const result = await response.json();
    renderDetail(result.data);
  } catch (error) {
    errorDiv.textContent = "Error loading anime ❌";
  } finally {
    loading.style.display = "none";
  }
}

// Renderizar detalle del anime
function renderDetail(anime) {
  detail.innerHTML = `
    <h2>${anime.title}</h2>
    <img src="${anime.images.large_image_url}" alt="${anime.title}" width="300">

    <h3>Titles</h3>
    <ul>
      ${anime.titles.map(t => `<li>${t.title}</li>`).join("")}
    </ul>

    <p>${anime.synopsis}</p>
    <p><strong>Started:</strong> ${anime.aired.from || "N/A"}</p>
    <p><strong>Ended:</strong> ${anime.aired.to || "N/A"}</p>
  `;
}

// Ejecutar al cargar la página
fetchAnimeDetail();
