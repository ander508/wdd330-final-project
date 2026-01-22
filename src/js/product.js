import { getParam } from "./utils.mjs";
<<<<<<< HEAD
import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

=======
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
>>>>>>> 4b6ae7e14200ed016ebb1b0152193b0971ba943e

const productId = getParam("product");
const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();