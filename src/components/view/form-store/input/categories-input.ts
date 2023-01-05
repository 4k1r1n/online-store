import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';
import getCategories from '../../../model/categories-model';
import { handelLocalStorage, handleQuerySearch } from '../../../controller/main-page';
import { filterData, toggleFilters } from '../../../model/filter-model';
import { renderFilterCards } from '../../../view/cards-store/cards-store';
import changeFoundProducts, { calculateBalanceOfProducts, getAmountOfProducts } from '../../../model/found-model';
import { Product } from '../../../../types/types';

const categories = getCategories();

export function createCategoriesInput(data: Product[]) {
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
    renderFilterCards(filterData());
    changeFoundProducts();
    toggleFilters();
  });
  for (let i = 0; i < categories.length; i++) {
    const minAmount = calculateBalanceOfProducts(data, 'category', categories[i].category);
    const maxAmount = getAmountOfProducts('category', categories[i].category);
    section.append(createCheckbox(categories[i].category, categories[i].id, minAmount, maxAmount));
  }
  return section;
}
