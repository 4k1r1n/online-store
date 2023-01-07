import createElement from '../utils/create-element';
import renderCartContent, { renderEmptyCart } from '../components/view/cart-content/cart-content';
import renderCartSummary from '../components/view/cart-summary/cart-summary';
import { Product } from '../types/types';

export const cartContainer = createElement('div', 'cart wrapper');

export default function getCart() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  checkCartIsEmpty(cart);
  return cartContainer;
}

export function checkCartIsEmpty(cart: Product[]) {
  cartContainer.textContent = '';
  if (!cart || !cart.length) {
    cartContainer.append(renderEmptyCart());
  } else {
    cartContainer.append(renderCartContent(cart));
    cartContainer.append(renderCartSummary());
  }
}
