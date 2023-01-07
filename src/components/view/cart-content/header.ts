import createElement from '../../../utils/create-element';
import { createInputItemsCountPerPage } from '../input/input';

export default function renderCartHeader() {
  const cartHeader = createElement('div', 'cart__header');
  const heading = createElement('h2', 'cart__heading', 'Cart');
  const itemsCountText = createElement('span', 'cart__count', 'Limit');
  cartHeader.append(heading, itemsCountText, createInputItemsCountPerPage());

  return cartHeader;
}
