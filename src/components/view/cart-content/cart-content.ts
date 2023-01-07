import { Product } from './../../../types/types';
import createElement from '../../../utils/create-element';
import createCartItem from '../cart-item/cart-item';
import renderCartHeader from './header';
import renderCartFooter from './footer';
import { limit } from '../input/input';
import { calcNumPages, changePage, setCurrentPage } from '../../model/cart';

export const contentItems = createElement('div', 'content__items');
export const cartIsEmpty = createElement('h3', 'content__text');

export function createCartItems(cart: Product[]) {
  contentItems.textContent = '';
  const items = [];
  if (!cart || !cart.length) {
    contentItems.append(cartIsEmpty);
    cartIsEmpty.textContent = 'Cart is empty';
  } else {
    for (let i = 0; i < cart.length; i++) {
      cartIsEmpty.textContent = '';
      const cartItem = cart[i] as Product;
      const num = i + 1;
      items.push(createCartItem(num, cartItem));
    }
  }
  return items;
}

export function displayCartItemsPerPage(cart: Product[], limit: number) {
  const items = createCartItems(cart);
  if (items.length < limit) limit = items.length;
  for (let i = 0; i < limit; i++) {
    contentItems.appendChild(items[i]);
  }
}

export default function renderCartContent(cart: Product[]) {
  const contentWrapper = createElement('div', 'content__wrapper');
  const cartContent = createElement('div', 'cart__content content');
  const contentHeader = renderCartHeader();
  cartContent.append(contentWrapper);
  contentWrapper.append(contentHeader, contentItems);
  displayCartItemsPerPage(cart, limit);
  const currentPage = setCurrentPage();
  const numPages = calcNumPages(limit);
  changePage(currentPage, numPages);
  cartContent.append(renderCartFooter());
  return cartContent;
}
