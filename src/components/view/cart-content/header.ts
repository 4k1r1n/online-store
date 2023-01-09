import createElement from '../../../utils/create-element';
import { createInputItemsCountPerPage } from '../input/input';

export default function renderCartHeader() {
  const cartHeader = createElement('div', 'cart__header');
  const limitContainer = createElement('div', 'cart__limit limit');
  const heading = createElement('h2', 'cart__heading', 'Cart');
  const limitText = createElement('span', 'limit__text', 'Limit');
  const limitInput = createInputItemsCountPerPage();
  cartHeader.append(heading, limitContainer);
  limitContainer.append(limitText, limitInput);

  return cartHeader;
}
