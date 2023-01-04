import createElement from '../../../../utils/create-element';
import { filterLocalStorage } from '../../../controller/main-page';
import { filterData } from '../../../model/filter-model';
import { createFilterInput } from '../input/filter-input';

export default function renderFilter() {
  const filters = createElement('section', 'filter');
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Brand');
  // add elements
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const fliterStorage = filterLocalStorage(obj);
  const data = filterData(fliterStorage);
  filters.append(heading);
  filters.append(createFilterInput(data));
  return filters;
}
