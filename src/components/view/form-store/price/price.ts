import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import {
  filterByRange,
  filterData,
  getQueryParams,
  toggleBrandFilters,
  toggleCategoryFilters,
  toggleStockFilters,
} from '../../../model/filter-model';
import { findAllPrices } from '../../../model/find-data';
import changeFoundProducts from '../../../model/found-model';
import { renderFilterCards } from '../../cards-store/cards-store';
import { createRange } from '../../input/input';

export default function renderPriceRage() {
  const min = Math.min(...findAllPrices());
  const max = Math.max(...findAllPrices());
  const priceRange = createElement('section', 'price');
  const queryParams = getQueryParams().price;
  const [leftPrice, rightPrice] = queryParams ? queryParams : [min, max];
  priceRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'price', filterQueryParams);
    handleQuerySearch();
    const [newLeftPrice, newRightPrice] = getQueryParams().price;
    const filteredData = filterByRange({
      Products: filterData(),
      key: 'price',
      leftRange: +newLeftPrice,
      rightRange: +newRightPrice,
    });
    renderFilterCards(filteredData);
    changeFoundProducts();
    toggleBrandFilters();
    toggleCategoryFilters();
    toggleStockFilters();
  });

  const heading = createElement('h4', 'aside-store__heading', 'Price');

  priceRange.appendChild(heading);
  priceRange.appendChild(createRange(min, max, +leftPrice, +rightPrice));
  return priceRange;
}
