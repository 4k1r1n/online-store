import createElement from '../../../../utils/create-element';
import createCheckbox from '../../input/input';

export function createFilterInput() {
  const section = createElement('div', 'filter__input');
  for (let i = 0; i < 3; i++) section.appendChild(createCheckbox());
  return section;
}
