import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange, handleQuerySearch } from '../../../controller/main-page';
import { getQueryParams } from '../../../model/filter-model';
import { findAllPrices } from '../../../model/find-data';
import { createRange } from '../../input/input';

export default function renderPriceRage() {
  const min = Math.min(...findAllPrices());
  const max = Math.max(...findAllPrices());
  const priceRange = createElement('section', 'price');
  priceRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'price', filterQueryParams);
    handleQuerySearch();
  });
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Price');
  // add elements
  priceRange.appendChild(heading);
  const queryParams = getQueryParams().price;
  const [leftPrice, rightPrice] = queryParams ? queryParams : [min, max];
  priceRange.appendChild(createRange(min, max, +leftPrice, +rightPrice));
  return priceRange;
}
