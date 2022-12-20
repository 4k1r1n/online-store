import createElement from '../../../../utils/create-element';
import { createFilterInput } from '../input/filter-input';

export default function renderFilter() {
  const filters = createElement('section', 'filter');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Filters');
  // add elements
  filters.appendChild(heading);
  filters.appendChild(createFilterInput());
  return filters;
}
