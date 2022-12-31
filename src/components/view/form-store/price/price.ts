import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange } from '../../../controller/main-page';
import { findAllPrices } from '../../../model/find-data';
import { createRange } from '../../input/input';

export default function renderPriceRage(valueL?: number, valueR?: number) {
  const min = Math.min(...findAllPrices());
  const max = Math.max(...findAllPrices());
  const priceRange = createElement('section', 'price');
  priceRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'price', filterQueryParams);
    const event = e.target as HTMLInputElement;
    console.log(filterQueryParams);
    switch (event.className) {
      case 'multi-range__right':
        // event.value = valueR.toString();
        break;
      case 'multi-range__left':
        // event.value = valueL.toString();
        break;
    }
  });
  //create heading
  const heading = createElement('h4', 'aside-store__heading', 'Price');
  // add elements
  priceRange.appendChild(heading);
  priceRange.appendChild(createRange(min, max));
  return priceRange;
}
