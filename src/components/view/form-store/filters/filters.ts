import createElement from '../../../../utils/create-element';
import { filterData } from '../../../model/filter-model';
import { createFilterInput } from '../input/filter-input';

export default function renderFilter() {
  const filters = createElement('section', 'filter');
  const heading = createElement('h4', 'aside-store__heading', 'Brand');

  const data = filterData();
  filters.append(heading);
  filters.append(createFilterInput(data));
  return filters;
}
