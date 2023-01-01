import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import { getQueryParams } from '../../../model/filter-model';
import { findAllStock } from '../../../model/find-data';
import { createRange } from '../../input/input';

export default function renderStockRage() {
  const min = Math.min(...findAllStock());
  const max = Math.max(...findAllStock());
  const stockRange = createElement('section', 'stock');
  stockRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'stock', filterQueryParams);
    handleQuerySearch();
  });
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Stock');
  // add elements
  stockRange.appendChild(heading);
  const queryParams = getQueryParams().price;
  const [leftStock, rightStock] = queryParams ? queryParams : [min, max];
  stockRange.appendChild(createRange(min, max, +leftStock, +rightStock));
  return stockRange;
}
