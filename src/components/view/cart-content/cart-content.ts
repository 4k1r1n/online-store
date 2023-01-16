import { Product } from './../../../types/types';
import createElement from '../../../utils/create-element';
import createCartItem from '../cart-item/cart-item';
import renderCartHeader from './header';
import renderCartFooter from './footer';
import { limit } from '../input/input';
import { calculatePagesCount, changePage, setCurrentPage } from '../../model/cart';

export const contentItems = createElement('div', 'content__items');

export function createCartItems(cart: Product[]) {
  const items = [];
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i] as Product;
    const num = i + 1;
    items.push(createCartItem(num, cartItem));
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
  const pagesCount = calculatePagesCount(limit);
  changePage(currentPage, pagesCount);
  cartContent.append(renderCartFooter());
  return cartContent;
}

export function renderEmptyCart() {
  const cartIsEmpty = createElement('h3', 'content__text');
  cartIsEmpty.textContent = 'Cart is empty';
  return cartIsEmpty;
}
