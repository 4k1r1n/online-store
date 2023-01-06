import createElement from '../../../utils/create-element';
import { getFoundProducts } from '../../model/found-model';
import { createSearch, createOptions } from '../input/input';
import cardsArrButton from './cards-arrangment-btn';
import storeFound from './found';

export default function renderMenu() {
  const menu = createElement('div', 'menu');
  menu.append(createSearch());
  menu.append(createOptions());
  const view = localStorage.getItem('view');
  menu.append(cardsArrButton(view ?? 'columns'));
  const foundProducts = getFoundProducts();
  menu.append(storeFound(foundProducts));
  return menu;
}
