import { Product } from './../../../types/types';
import createElement from '../../../utils/create-element';
import createCartItem from '../cart-item/cart-item';
import renderCartHeader from './header';
import renderCartFooter from './footer';

export default function renderCartContent(cart: Product[]) {
  const cartContent = createElement('div', 'cart__content content');
  const contentWrapper = createElement('div', 'content__wrapper');
  const contentItems = createElement('div', 'content__items');
  const cartIsEmpty = createElement('h3', 'content__text');
  const contentHeader = renderCartHeader();
  cartContent.append(contentWrapper);
  contentWrapper.append(contentHeader, contentItems);
  if (!cart || !cart.length) {
    contentItems.append(cartIsEmpty);
    cartIsEmpty.textContent = 'Cart is empty';
  } else {
    for (let i = 0; i < cart.length; i++) {
      cartIsEmpty.textContent = '';
      const cartItem = cart[i] as Product;
      const num = i + 1;
      contentItems.appendChild(createCartItem(num, cartItem));
    }
  }
  cartContent.append(renderCartFooter());
  return cartContent;
}
