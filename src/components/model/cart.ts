import data from '../../data/data';
import { newTotal, productsCount, sumTotal } from '../view/cart-summary/cart-summary';
import { cartCounter, total } from '../view/header/header';
import { Product } from './../../types/types';

export function addProduct(obj: Product) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  cart.push(obj);
  const uniqueProducts = [...new Map(cart.map((item) => [item.id, item])).values()];
  localStorage.setItem('cart', JSON.stringify(uniqueProducts));
}

export function removeProduct(obj: Product) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  const cartWithoutProduct = cart.filter((product) => product.id !== obj.id);
  localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
}

export function setItemCount(item: HTMLElement, stock: number) {
  const itemId = Number(item.getAttribute('data-id'));
  let cart: Product[] = [];
  let count;
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.cart);
    cart.forEach((product) => {
      if (product.id === itemId) {
        count = stock - product.stock;
      }
    });
  }
  return count;
}

export function setCartItemsCount() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const count = [];
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j].id === cart[i].id) {
        count.push(data[j].stock - cart[i].stock);
      }
    }
  }
  const itemsCount = count.reduce((acc, value) => {
    return acc + value;
  }, 0);
  cartCounter.textContent = `${itemsCount}`;
  productsCount.textContent = `${itemsCount}`;
}

export function setCartTotal() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const itemsCount = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  total.textContent = `${itemsCount}`;
  sumTotal.textContent = `${itemsCount}`;
}

export function setCartTotalWithDiscount(discount: number) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const itemsCount = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  newTotal.textContent = `${itemsCount - (itemsCount * discount) / 100}`;
}
