import createElement from '../../../utils/create-element';
import { createCard } from '../card/card';
import renderMenu from './menu';
import { handleProductClick } from '../../controller/main-page';
import { Product } from '../../../types/types';
import { filterData } from '../../model/filter-model';

export function renderFilterCards(data: Product[]) {
  const section = document.querySelector('.cards-section') as HTMLElement;
  section.lastChild?.remove();
  section.appendChild(renderCards(data));
}

const renderCards = (data: Product[]) => {
  const layout = createElement('div', 'cards layout-3-column');
  layout.addEventListener('click', (e) => {
    handleProductClick(e);
  });
  for (let i = 0; i < data.length; i++) {
    layout.appendChild(createCard(data[i].images[0], data[i].title, data[i].price, data[i].id));
  }
  return layout;
};

export default function renderCardsLayout() {
  const data = filterData();
  const section = createElement('section', 'cards-section');
  const layout = renderCards(data);
  section.appendChild(renderMenu());
  section.appendChild(layout);

  return section;
}
