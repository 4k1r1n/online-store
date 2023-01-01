import createElement from '../../../../utils/create-element';
import { filterLocalStorage, handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import { filterByRange, filterData, getQueryParams } from '../../../model/filter-model';
import { findAllPrices } from '../../../model/find-data';
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
    const obj = JSON.parse(JSON.stringify({ ...localStorage }));
    const fliterStorage = filterLocalStorage(obj);
    const filteredData = filterByRange(filterData(fliterStorage), 'price', +newLeftPrice, +newRightPrice);
    renderFilterCards(filteredData);
  });
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Price');
  // add elements
  priceRange.appendChild(heading);
  priceRange.appendChild(createRange(min, max, +leftPrice, +rightPrice));
  return priceRange;
}
