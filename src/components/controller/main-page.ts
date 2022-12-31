import getProduct from '../../pages/product-details';
import { PATHS } from '../../constants/constants';

export function handleQuerySearch() {
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const params = filterQuery(obj).join('&').split(',').join('%2C');
  const searchDevider = localStorage.length ? '?' : '';
  const url = window.location.origin + searchDevider + params;
  window.history.pushState({}, '', url);
}

export function setLocalStorage(params: string, type: string) {
  localStorage.setItem(type, params);
}

export function handleProductClick(e: Event) {
  const event = e.target as HTMLElement;
  if (event.tagName === 'IMG') {
    const id = event.getAttribute('data-id') as string;
    const link = window.location.origin + PATHS.product + id;
    window.history.pushState({}, '', link);
    renderProductsSection(+id);
  }
}

export function renderProductsSection(id: number) {
  const rootElement = document.getElementById('app') as HTMLElement;
  rootElement.innerHTML = '';
  const page = getProduct(+id);
  rootElement.append(page);
}

function filterQuery(object: object) {
  const array: string[][] = [];
  for (const [key, value] of Object.entries(object)) {
    array.push([`${key}=${value}`]);
  }
  return array;
}

export function filterLocalStorage(object: object) {
  const array: string[][] = [];
  for (const [key, value] of Object.entries(object)) {
    const newValue = value.split(',');
    for (let i = 0; i < newValue.length; i++) {
      array.push([`${key},${newValue[i]}`]);
    }
  }
  return array.map((el) => el.join().split(','));
}

export function handelLocalStorage(event: Event, key: string, query: string[]) {
  const value = (event.target as HTMLInputElement).value;
  if (query.indexOf(value) === -1) {
    query.push(value);
  } else {
    query.splice(query.indexOf(value), 1);
  }
  setLocalStorage(query.join(','), key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}
