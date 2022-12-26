import createElement from '../../../utils/create-element';
import { createCard } from '../card/card';
import data from '../../../data/data';
import renderMenu from './menu';
import { handleProductClick } from '../../controller/main-page';

export default function renderCardsLayout() {
  const section = createElement('section', 'cards-section');
  const layout = createElement('div', 'cards-section__layout');
  layout.addEventListener('click', (e) => {
    handleProductClick(e);
  });
  section.appendChild(renderMenu());
  for (let i = 0; i < data.length; i++) {
    layout.appendChild(createCard(data[i].images[0], data[i].title, data[i].price, data[i].id));
  }
  section.appendChild(layout);
  return section;
}
