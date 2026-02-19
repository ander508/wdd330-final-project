const PROXY = "https://cors-anywhere.herokuapp.com/"; // dev-only
const BASE_URL = "https://api.deezer.com";

/**
 * Get top tracks from Deezer
 */
export async function getTopTracks() {
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/chart/0/tracks`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data; // array of tracks
  } catch (err) {
    console.error("Failed to get top tracks:", err);
    return [];
  }
}

/**
 * Search tracks by query
 */
export async function searchTracks(query) {
  try {
    const response = await fetch(
      `${PROXY}${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data; // array of tracks
  } catch (err) {
    console.error("Failed to search tracks:", err);
    return [];
  }
}

/**
 * Get a single track by ID
 */
export async function getTrackById(id) {
  if (!id) throw new Error("Track ID is required");
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/track/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data; // single track object
  } catch (err) {
    console.error(`Failed to get track ${id}:`, err);
    return null;
  }
}



// const BASE_URL = "https://api.deezer.com";

// function jsonp(endpoint) {
//   return new Promise((resolve, reject) => {
//     const callbackName = "jsonp_callback_" + Math.round(Math.random() * 100000);

//     window[callbackName] = function (data) {
//       delete window[callbackName];
//       document.body.removeChild(script);
//       resolve(data);
//     };

//     const separator = endpoint.includes("?") ? "&" : "?";

//     const script = document.createElement("script");
//     script.src = `${BASE_URL}${endpoint}${separator}output=jsonp&callback=${callbackName}`;
//     script.onerror = reject;

//     document.body.appendChild(script);
//   });
// }

// export async function getTopTracks() {
//   const data = await jsonp("/chart/0/tracks");
//   return data.data || [];
// }

// export async function searchTracks(query) {
//   const encodedQuery = encodeURIComponent(query);
//   const data = await jsonp(`/search?q=${encodedQuery}`);
//   return data.data || [];
// }

// export async function getTrackById(id) {
//   return jsonp(`/track/${id}`);
// }
