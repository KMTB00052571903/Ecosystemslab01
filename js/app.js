const animeResults = document.getElementById("animeResults");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function fetchAnimeList() {
  try {
    loading.style.display = "block";
    error.style.display = "none";
    animeResults.innerHTML = "";

    const res = await fetch("https://api.jikan.moe/v4/anime");
    const data = await res.json();

    loading.style.display = "none";

    // Si no hay resultados
    if (!data.data || data.data.length === 0) {
      animeResults.innerHTML = "<p>No se encontraron animes.</p>";
      return;
    }

    data.data.forEach(anime => {
      const div = document.createElement("div");
      div.classList.add("anime-card");

      // Recortar la sinopsis para que no sea tan larga
      const shortSynopsis = anime.synopsis 
        ? anime.synopsis.substring(0, 200) + "..." 
        : "Sin sinopsis disponible";

      div.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" width="200">
        <p>${shortSynopsis}</p>
        <a href="detail.html?id=${anime.mal_id}">Ver más</a>
      `;
      animeResults.appendChild(div);
    });
  } catch (err) {
    loading.style.display = "none";
    error.style.display = "block";
    error.textContent = "Error: " + err.message;
  }
}

fetchAnimeList();
