import createElement from '../../../../utils/create-element';
import { filterLocalStorage, handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import { filterByRange, filterData, getQueryParams } from '../../../model/filter-model';
import { findAllStock } from '../../../model/find-data';
import changeFoundProducts from '../../../model/found-model';
import { renderFilterCards } from '../../cards-store/cards-store';
import { createRange } from '../../input/input';

export default function renderStockRage() {
  const min = Math.min(...findAllStock());
  const max = Math.max(...findAllStock());
  const stockRange = createElement('section', 'stock');
  const queryParams = getQueryParams().stock;
  const [leftStock, rightStock] = queryParams ? queryParams : [min, max];
  stockRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'stock', filterQueryParams);
    handleQuerySearch();
    const [newLeftStock, newRightStock] = getQueryParams().stock;
    const obj = JSON.parse(JSON.stringify({ ...localStorage }));
    const fliterStorage = filterLocalStorage(obj);
    const filteredData = filterByRange(filterData(fliterStorage), 'stock', +newLeftStock, +newRightStock);
    renderFilterCards(filteredData);
    changeFoundProducts();
  });
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Stock');
  // add elements
  stockRange.appendChild(heading);
  stockRange.appendChild(createRange(min, max, +leftStock, +rightStock));
  return stockRange;
}
