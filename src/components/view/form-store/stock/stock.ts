import createElement from '../../../../utils/create-element';
import { handleLocalStorageRange } from '../../../controller/main-page';
import { findAllStock } from '../../../model/find-data';
import { createRange } from '../../input/input';

export default function renderStockRage() {
  const min = Math.min(...findAllStock());
  const max = Math.max(...findAllStock());
  const stockRange = createElement('section', 'stock');
  stockRange.addEventListener('input', (e) => {
    const filterQueryParams: string[] = [];
    handleLocalStorageRange(e, 'stock', filterQueryParams);
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
  const heading = createElement('h4', 'aside-store__heading', 'Stock');
  // add elements
  stockRange.appendChild(heading);
  stockRange.appendChild(createRange(min, max));
  return stockRange;
}
