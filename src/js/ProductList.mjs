import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="../${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="favorite-btn" data-id="${product.Id}">
        ♡ Add to Favorites
      </button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
    this.addFavoriteListeners(); // attach favorite listeners after rendering
    this.markSavedFavorites();   // update button states for already saved favorites
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addFavoriteListeners() {
    const buttons = this.listElement.querySelectorAll('.favorite-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        this.saveFavorite(id);
        btn.textContent = '♥ Saved';
      });
    });
  }

  saveFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  markSavedFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.listElement.querySelectorAll('.favorite-btn').forEach(btn => {
      if (favorites.includes(btn.dataset.id)) {
        btn.textContent = '♥ Saved';
      }
    });
  }
}
