import createElement from '../../../../utils/create-element';
import { filterLocalStorage } from '../../../controller/main-page';
import { filterData } from '../../../model/filter-model';
import { createCategoriesInput } from '../input/categories-input';

export default function renderCategories() {
  const categories = createElement('section', 'categories');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Categories');
  // add elements
  categories.append(heading);
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const fliterStorage = filterLocalStorage(obj);
  const data = filterData(fliterStorage);
  categories.append(createCategoriesInput(data));
  return categories;
}
