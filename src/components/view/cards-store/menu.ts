import createElement from '../../../utils/create-element';
import { createSearch, createOptions } from '../input/input';
import cardsArrButton from './cards-arrangment-btn';
import storeFound from './found';

export default function renderMenu() {
  const menu = createElement('div', 'menu');
  menu.append(createSearch());
  menu.append(createOptions());
  menu.append(cardsArrButton());
  menu.append(storeFound('3'));
  return menu;
}
