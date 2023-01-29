import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import {
  filterByRange,
  filterData,
  getQueryParams,
  toggleBrandFilters,
  toggleCategoryFilters,
  togglePriceFilters,
} from '../../../model/filter-model';
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
    handleLocalStorageRange({ event: e, key: 'stock', query: filterQueryParams });
    handleQuerySearch();
    const [newLeftStock, newRightStock] = getQueryParams().stock;
    const filteredData = filterByRange({
      Products: filterData(),
      key: 'stock',
      leftRange: +newLeftStock,
      rightRange: +newRightStock,
    });
    renderFilterCards(filteredData);
    changeFoundProducts();
    changeFoundProducts();
    toggleBrandFilters();
    toggleCategoryFilters();
    togglePriceFilters();
  });

  const heading = createElement('h4', 'aside-store__heading', 'Stock');
  stockRange.appendChild(heading);
  stockRange.appendChild(createRange(min, max, +leftStock, +rightStock));
  return stockRange;
}
