import createElement from '../../../../utils/create-element';
import { createCategoriesInput } from '../input/categories-input';

export default function renderCategories() {
  const categories = createElement('section', 'categories');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Categories');
  // add elements
  categories.appendChild(heading);
  categories.appendChild(createCategoriesInput());
  return categories;
}
