import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");

async function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const container = document.querySelector("#favorite-list");

  if (favorites.length === 0) {
    container.innerHTML = "<p>No favorites saved yet.</p>";
    return;
  }

  for (let id of favorites) {
    const product = await dataSource.findProductById(id);

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.Image}" alt="${product.Name}">
      <h3>${product.Name}</h3>
      <p>$${product.FinalPrice}</p>
    `;

    container.appendChild(card);
  }
}

loadFavorites();
