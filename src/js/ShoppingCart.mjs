import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderList(list);
  }
  calculateListTotal(list) {
    if (!list) {
        this.total = 0;
        return;
    }
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item, 0);
  }
  renderList(list) {
    const parentElement = document.querySelector(this.parentSelector);
    if (!list || list.length === 0) {
        parentElement.innerHTML = '<li>Your cart is empty</li>';
        return;
    }
    renderListWithTemplate(cartItemTemplate, parentElement, list);
    
    // Also render total
    document.querySelector(".cart-total").innerText = `Total: $${this.total.toFixed(2)}`;
    // Hide footer if empty handled by CSS mostly but strict check:
    if(this.total > 0) {
        document.querySelector(".cart-footer").classList.remove("hide");
    } else {
        document.querySelector(".cart-footer").classList.add("hide");
    }
  }
}
