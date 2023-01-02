import { Product } from './../../../types/types';
import createElement from '../../../utils/create-element';
import createCartItem from '../cart-item/cart-item';
import renderCartHeader from './header';
import renderCartFooter from './footer';

export default function renderCartContent(cart: object[]) {
  const cartContent = createElement('div', 'cart__content');
  const cartItems = createElement('div', 'cart__items');
  const cartIsEmpty = createElement('h3', 'cart__text');
  cartContent.append(renderCartHeader(), cartItems);
  if (!cart) {
    cartItems.append(cartIsEmpty);
    cartIsEmpty.textContent = 'Cart is empty';
  } else {
    cartIsEmpty.textContent = '';
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i] as Product;
      const num = i + 1;
      cartItems.appendChild(createCartItem(num, cartItem));
    }
  }
  cartContent.append(renderCartFooter());
  return cartContent;
}
