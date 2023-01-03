import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';
import getCategories from '../../../model/categories-model';
import { filterLocalStorage, handelLocalStorage, handleQuerySearch } from '../../../controller/main-page';
import { filterData } from '../../../model/filter-model';
import { renderFilterCards } from '../../../view/cards-store/cards-store';
import changeFoundProducts, { getAmountOfProducts } from '../../../model/found-model';

const categories = getCategories();

export function createCategoriesInput() {
  let filterQueryParams: string[] = [];
  if (!window.location.search) {
    localStorage.removeItem('category');
    localStorage.removeItem('brand');
  }

  if (localStorage.length !== 0) {
    const newfilter = localStorage.getItem('category')?.split(',');
    if (newfilter) filterQueryParams = newfilter;
  }
  const section = createElement('div', 'categories__input');
  section.addEventListener('change', (e: Event) => {
    handelLocalStorage(e, 'category', filterQueryParams);
    handleQuerySearch();
    const obj = JSON.parse(JSON.stringify({ ...localStorage }));
    const fliterStorage = filterLocalStorage(obj);
    renderFilterCards(filterData(fliterStorage));
    changeFoundProducts();
  });
  for (let i = 0; i < categories.length; i++) {
    const maxAmount = getAmountOfProducts('category', categories[i].category);
    section.append(createCheckbox(categories[i].category, categories[i].id, 10, maxAmount));
  }
  return section;
}
