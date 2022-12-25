import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';
import getBrand from '../../../model/brand-mondel';
import { handleQuerySearch } from '../../../controller/main-page';

const brand = getBrand();

export function createFilterInput() {
  const section = createElement('div', 'filter__input');
  section.addEventListener('click', (e: Event) => {
    handleQuerySearch(e, 'brand');
  });
  for (let i = 0; i < brand.length; i++) section.appendChild(createCheckbox(brand[i].brand, brand[i].id));
  return section;
}
