import { filterLocalStorage } from '../controller/main-page';
import { filterData } from './filter-model';

export default function changeFoundProducts() {
  const value = getFoundProducts();
  const found = document.querySelector('.menu__found') as HTMLElement;
  found.textContent = 'Found ' + value;
}

export function getFoundProducts() {
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const fliterStorage = filterLocalStorage(obj);
  return filterData(fliterStorage).length.toString();
}
