import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimaryMedium || "/images/placeholder.png"}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
  </li>`;
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartList = document.querySelector(".product-list");

  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    cartList.insertAdjacentHTML("beforeend", cartItemTemplate(item));
  });

  renderCartTotal(cartItems);
}

// Event delegation for remove buttons
document.querySelector(".product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    const id = event.target.dataset.id;
    removeFromCart(id);
  }
});

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart = cart.filter((item) => item.Id !== id);
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCart();
}

function renderCartTotal(items) {
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!items.length) {
    footer.classList.add("hide");
    return;
  }

  footer.classList.remove("hide");
  const sum = items.reduce((total, item) => total + item.FinalPrice, 0);
  totalElement.textContent = `Total: $${sum.toFixed(2)}`;
}

// Initial render
renderCart();
