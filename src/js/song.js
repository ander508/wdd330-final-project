import { getTrackById } from "./api.js";
import { getParam, getLocalStorage, setLocalStorage } from "./utils.js";

const songId = getParam("id");
const songDetail = document.querySelector("#songDetail");

console.log("song.js loaded");
console.log("songId:", songId);

if (!songId) {
  songDetail.innerHTML = "<p>No song selected.</p>";
} else {
  getTrackById(songId)
    .then((track) => {
      console.log("track data:", track);

      if (!track || !track.artist) {
        songDetail.innerHTML = "<p>Song not found or API unavailable.</p>";
        return;
      }

      // Render song details
      songDetail.innerHTML = `
        <h2>${track.title}</h2>
        <h3>${track.artist.name}</h3>
        <img src="${track.album.cover_big}" alt="${track.title}">
        <audio controls src="${track.preview}"></audio>
        <button id="favBtn">♡ Add to Favorites</button>
      `;

      // Add to favorites
      const favBtn = document.querySelector("#favBtn");
      favBtn.addEventListener("click", () => {
        const favorites = getLocalStorage("favorites");
        if (!favorites.find((t) => t.id === track.id)) {
          favorites.push(track);
          setLocalStorage("favorites", favorites);
          alert(`${track.title} added to favorites`);
        } else {
          alert(`${track.title} is already in favorites`);
        }
      });
    })
    .catch((err) => {
      console.error("Failed to fetch track:", err);
      songDetail.innerHTML =
        "<p>Failed to load song. API may be unavailable.</p>";
    });
}




// import { getTrackById } from "./api.js";

// const songDetail = document.querySelector("#songDetail");

// document.addEventListener("DOMContentLoaded", async () => {
//   const params = new URLSearchParams(window.location.search);
//   const songId = params.get("id");

//   if (!songId) {
//     songDetail.innerHTML = "<p>No song selected.</p>";
//     return;
//   }

//   try {
//     const track = await getTrackById(songId);

//     if (!track?.id || !track?.artist) {
//       songDetail.innerHTML = "<p>Song not found.</p>";
//       return;
//     }

//     songDetail.innerHTML = `
//       <h2>${track.title}</h2>
//       <h3>${track.artist.name}</h3>
//       <img src="${track.album?.cover_big}" alt="${track.title}">
//       <audio controls src="${track.preview}"></audio>
//       <button id="favBtn">♡ Add to Favorites</button>
//     `;

//     document.querySelector("#favBtn").addEventListener("click", () => {
//       addToFavorites(track);
//     });

//   } catch (error) {
//     console.error(error);
//     songDetail.innerHTML = "<p>Failed to load song.</p>";
//   }
// });

// // ==========================
// // FAVORITES
// // ==========================
// function getFavorites() {
//   return JSON.parse(localStorage.getItem("favorites")) || [];
// }

// function addToFavorites(track) {
//   const favorites = getFavorites();

//   const exists = favorites.find((t) => t.id === track.id);

//   if (!exists) {
//     favorites.push(track);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//     alert("Added to favorites!");
//   } else {
//     alert("Already in favorites!");
//   }
// }
