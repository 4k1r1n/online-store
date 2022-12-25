import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';
import getCategories from '../../../model/categories-model';
import { handleQuerySearch } from '../../../controller/main-page';

const categories = getCategories();

export function createCategoriesInput() {
  const section = createElement('div', 'categories__input');
  section.addEventListener('click', (e: Event) => {
    handleQuerySearch(e, 'category');
  });
  for (let i = 0; i < categories.length; i++) section.append(createCheckbox(categories[i].category, categories[i].id));
  return section;
}
