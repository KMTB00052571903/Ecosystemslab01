const detailContainer = document.getElementById("detail");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

async function fetchAnimeDetail() {
  try {
    loading.style.display = "block";
    error.textContent = "";
    detailContainer.innerHTML = "";

    const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = await res.json();
    const anime = data.data;

    loading.style.display = "none";

    if (!anime) {
      detailContainer.innerHTML = "<p>No se encontró el anime.</p>";
      return;
    }

    detailContainer.innerHTML = `
      <h2>${anime.title}</h2>
      <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" width="250">
      <p>${anime.synopsis || "Sin sinopsis disponible"}</p>
      <p><strong>Fecha de inicio:</strong> ${anime.aired.from || "No disponible"}</p>
      <p><strong>Fecha de finalización:</strong> ${anime.aired.to || "No disponible"}</p>
      <h3>Títulos alternativos:</h3>
      <ul>
        ${anime.titles.map(t => `<li>${t.title}</li>`).join("")}
      </ul>
    `;
  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Error: " + err.message;
  }
}

fetchAnimeDetail();
