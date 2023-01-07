import createElement from '../../../utils/create-element';
import { nextPageButton, prevPageButton } from '../button/button';

export const prevPageBtn = prevPageButton();
export const nextPageBtn = nextPageButton();
export const cartPageNum = createElement('span', 'pagination__page-number', `${1}`);

export default function renderCartFooter() {
  const cartFooter = createElement('div', 'cart__footer');
  const cartPagination = createElement('div', 'cart__pagination pagination');
  const cartPageText = createElement('span', 'pagination__page-text', 'Page');
  cartPagination.append(prevPageBtn, cartPageNum, nextPageBtn);
  cartFooter.append(cartPageText, cartPagination);
  return cartFooter;
}
