import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';
import getBrands from '../../../model/brand-mondel';
import { filterLocalStorage, handelLocalStorage, handleQuerySearch } from '../../../controller/main-page';
import { filterData } from '../../../model/filter-model';
import { renderFilterCards } from '../../../view/cards-store/cards-store';

const brand = getBrands();

export function createFilterInput() {
  let filterQueryParams: string[] = [];
  if (localStorage.length !== 0) {
    const newfilter = localStorage.getItem('brand')?.split(',');
    if (newfilter) filterQueryParams = newfilter;
  }
  const section = createElement('div', 'filter__input');
  section.addEventListener('change', (e: Event) => {
    handelLocalStorage(e, 'brand', filterQueryParams);
    const obj = JSON.parse(JSON.stringify({ ...localStorage }));
    const fliterStorage = filterLocalStorage(obj);
    handleQuerySearch();
    renderFilterCards(filterData(fliterStorage));
  });
  for (let i = 0; i < brand.length; i++) section.appendChild(createCheckbox(brand[i].brand, brand[i].id));

  return section;
}
