import { Product } from './../../types/types';

let cart: Product[] = [];

export function addProduct(obj: Product) {
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  cart.push(obj);
  const uniqueProducts = [...new Map(cart.map((item) => [item.id, item])).values()];
  localStorage.setItem('cart', JSON.stringify(uniqueProducts));
  return uniqueProducts;
}

export function removeProduct(obj: Product) {
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  const cartWithoutProduct = cart.filter((product) => product.id !== obj.id);
  localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
  return cartWithoutProduct;
}
