import createElement from '../../../utils/create-element';
import { nextPageButton, prevPageButton } from '../button/button';

export default function renderCartFooter() {
  const cartFooter = createElement('div', 'cart__footer');
  const cartPageNum = createElement('span', 'cart__page-number', `Page ${1}`);
  cartFooter.append(prevPageButton(), cartPageNum, nextPageButton());

  return cartFooter;
}
