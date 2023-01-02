import createElement from '../../../utils/create-element';
import { itemsCountPerPage } from '../input/input';

export default function renderCartHeader() {
  const cartHeader = createElement('div', 'cart__header');
  const heading = createElement('h2', 'cart__heading', 'Cart');
  const itemsCountText = createElement('span', 'cart__count', 'Limit:'.toUpperCase());
  cartHeader.append(heading, itemsCountText, itemsCountPerPage());

  return cartHeader;
}
