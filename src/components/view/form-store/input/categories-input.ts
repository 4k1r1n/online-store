import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';

export function createCategoriesInput() {
  const section = createElement('div', 'categories__input');
  for (let i = 0; i < 3; i++) section.appendChild(createCheckbox());
  return section;
}
