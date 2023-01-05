import createElement from '../utils/create-element';
import renderCartContent from '../components/view/cart-content/cart-content';
import renderCartSummary from '../components/view/cart-summary/cart-summary';
import { Product } from '../types/types';

export const cartContainer = createElement('div', 'cart wrapper');

export default function getCart() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  cartContainer.append(renderCartContent(cart));
  cartContainer.append(renderCartSummary());
  return cartContainer;
}
