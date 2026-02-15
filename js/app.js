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

    data.data.forEach(anime => {
      const div = document.createElement("div");
      div.classList.add("anime-card");

      div.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" width="200">
        <p>${anime.synopsis || "Sin sinopsis disponible"}</p>
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
