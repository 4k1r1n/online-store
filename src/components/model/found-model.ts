import data from '../../data/data';
import { Product } from '../../types/types';
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

export function getAmountOfProducts(key: string, value: string) {
  let amount = 0;
  data.forEach((el) => {
    if (el[key] === value) amount += 1;
  });
  return amount;
}

export function calculateBalanceOfProducts(obj: Product[], key: string, value: string) {
  return obj.filter((el) => el[key] === value).length;
}
