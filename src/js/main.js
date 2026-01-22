import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create data source for tents
const dataSource = new ProductData("tents");

// Get the product list element
const productListElement = document.querySelector(".product-list");

// Create and initialize ProductList
const productList = new ProductList("tents", dataSource, productListElement);
productList.init();
