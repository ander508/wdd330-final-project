// import { getTopTracks, searchTracks } from "./api.js";
// import { qs, getLocalStorage, setLocalStorage } from "./utils.js";

// const trackList = qs("#trackList");
// const searchBtn = qs("#searchBtn");
// const searchInput = qs("#searchInput");

// // Render track cards
// function renderTracks(tracks) {
//   trackList.innerHTML = "";
//   tracks.forEach((track) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <a href="song.html?id=${track.id}">
//         <img src="${track.album.cover_medium}" alt="${track.title}">
//         <p>${track.title} - ${track.artist.name}</p>
//       </a>
//       <button data-id="${track.id}">♡ Add to Favorites</button>
//     `;
//     const btn = li.querySelector("button");
//     btn.addEventListener("click", () => addFavorite(track));
//     trackList.appendChild(li);
//   });
// }

// const favoritesList = document.querySelector("#favoritesList");

// function renderFavorites() {
//   const favorites = getLocalStorage("favorites") || [];
//   favoritesList.innerHTML = "";

//   if (favorites.length === 0) {
//     favoritesList.innerHTML = "<p>No favorites yet.</p>";
//     return;
//   }

//   favorites.forEach((track) => {
//     const artistName = track.artist?.name || "Unknown Artist";
//     const title = track.title || "Unknown Title";
//     const albumCover = track.album?.cover_small || ""; // small cover as fallback

//     const li = document.createElement("li");
//     li.innerHTML = `
//       <a href="song.html?id=${track.id}">
//         <img src="${albumCover}" alt="${title}" style="width:50px;height:50px;border-radius:6px;margin-right:0.5rem;vertical-align:middle;">
//         ${title} - ${artistName}
//       </a>
//     `;
//     favoritesList.appendChild(li);
//   });
// }

// // Call this whenever the page loads
// renderFavorites();

// // Favorites
// function addFavorite(track) {
//   const favorites = getLocalStorage("favorites");
//   if (!favorites.find((t) => t.id === track.id)) {
//     favorites.push(track);
//     setLocalStorage("favorites", favorites);
//     alert(`${track.title} added to favorites`);
//     renderFavorites(); // update the list
//   } else {
//     alert(`${track.title} is already in favorites`);
//   }
// }

// // Load top tracks on page load
// getTopTracks().then(renderTracks);

// // Search functionality
// searchBtn.addEventListener("click", async () => {
//   const query = searchInput.value.trim();
//   if (!query) return;

//   const results = await searchTracks(query);
//   renderTracks(results); // results is now an array
// });


import { getTopTracks, searchTracks } from "./api.js";

const songList = document.querySelector("#trackList");
const favoritesList = document.querySelector("#favoritesList");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

document.addEventListener("DOMContentLoaded", () => {
  loadTopTracks();
  renderFavorites();
});

// ==========================
// LOAD TOP TRACKS
// ==========================
async function loadTopTracks() {
  try {
    const tracks = await getTopTracks();
    renderSongs(tracks);
  } catch (error) {
    console.error(error);
    songList.innerHTML = "<p>Failed to load songs.</p>";
  }
}

// ==========================
// SEARCH
// ==========================
searchBtn?.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const tracks = await searchTracks(query);
    renderSongs(tracks);
  } catch (error) {
    console.error("Search failed:", error);
    songList.innerHTML = "<p>Search failed.</p>";
  }
});

// ==========================
// RENDER SONGS
// ==========================
function renderSongs(tracks) {
  songList.innerHTML = "";

  tracks.forEach((track) => {
    if (!track?.id || !track?.artist) return;

    const div = document.createElement("div");
    div.classList.add("song-card");

    div.innerHTML = `
      <img src="${track.album?.cover_medium}" alt="${track.title}">
      <h3>${track.title}</h3>
      <p>${track.artist.name}</p>
      <button data-id="${track.id}">View</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      window.location.href = `/song.html?id=${track.id}`;
    });

    songList.appendChild(div);
  });
}

// ==========================
// FAVORITES
// ==========================
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function renderFavorites() {
  if (!favoritesList) return;

  const favorites = getFavorites();
  favoritesList.innerHTML = "";

  favorites.forEach((track) => {
    if (!track?.id || !track?.artist) return;

    const div = document.createElement("div");
    div.classList.add("fav-card");

    div.innerHTML = `
      <img src="${track.album?.cover_small}" alt="${track.title}">
      <h4>${track.title}</h4>
      <p>${track.artist.name}</p>
    `;

    favoritesList.appendChild(div);
  });
}
