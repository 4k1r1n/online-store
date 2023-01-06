import createElement from '../../../utils/create-element';
import { handleLocalStorageSearch, handleLocalStorageSort, handleQuerySearch } from '../../controller/main-page';
import { filterData, queryValues, searchProduct, toggleFilters } from '../../model/filter-model';
import { renderFilterCards } from '../cards-store/cards-store';
import { SORTING } from '../../../constants/constants';
import { sortProducts } from '../../model/sort-model';
import changeFoundProducts from '../../model/found-model';

export default function createCheckbox(value: string, id: number, minStock: number, maxStock: number) {
  const checkbox = createElement('input', 'checkbox') as HTMLInputElement;
  const label = createElement('label', 'form__label', value);
  const amountOfProducts = createElement('span', 'form__stock', `${minStock}/${maxStock}`);
  const searcParams = queryValues();
  searcParams.forEach((el) => {
    if (el === value) checkbox.checked = true;
  });
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', value);
  checkbox.setAttribute('data-id', `${id}`);
  label.prepend(checkbox);
  label.append(amountOfProducts);
  return label;
}

export function createRange(min: number, max: number, valueL: number, valueR: number) {
  const container = createElement('div', 'multi-range');
  const labelContainer = createElement('div', 'multi-range__label');
  const minLable = createElement('div', 'multi-range__label-min', `${valueL}`);
  const maxLable = createElement('div', 'multi-range__label-max', `${valueR}`);
  labelContainer.append(minLable, maxLable);
  const leftRange = createElement('input', 'multi-range__left');
  leftRange.setAttribute('type', 'range');
  leftRange.setAttribute('min', `${min}`);
  leftRange.setAttribute('max', `${max}`);
  leftRange.setAttribute('value', `${valueL}`);
  leftRange.addEventListener('input', (e) => {
    const event = e.target as HTMLInputElement;
    const label = event.parentNode?.childNodes[0].firstChild;
    if (label) label.textContent = event.value;
  });
  const rightRange = createElement('input', 'multi-range__right');
  rightRange.setAttribute('min', `${min}`);
  rightRange.setAttribute('max', `${max}`);
  rightRange.setAttribute('type', 'range');
  rightRange.setAttribute('value', `${valueR}`);
  rightRange.addEventListener('input', (e) => {
    const event = e.target as HTMLInputElement;
    const label = event.parentNode?.childNodes[0].lastChild;
    if (label) label.textContent = event.value;
  });
  container.append(labelContainer, leftRange, rightRange);
  return container;
}

export function createSearch() {
  const search = createElement('input', 'search') as HTMLInputElement;
  search.setAttribute('type', 'search');
  search.setAttribute('placeholder', 'Search');
  if (localStorage.getItem('search')) search.value = localStorage.getItem('search') as string;
  search.addEventListener('input', (e) => {
    const event = e.target as HTMLInputElement;
    let value = event.value;

    value = value.trim().toLowerCase();

    handleLocalStorageSearch('search', value);
    handleQuerySearch();
    const data = filterData();
    renderFilterCards(searchProduct(data, value));
    changeFoundProducts();
    toggleFilters();
  });
  return search;
}

export function createOptions() {
  const wrapper = createElement('div', 'options');
  const datalist = createElement('select');
  datalist.setAttribute('id', 'options');
  const sortingValues = Object.values(SORTING);

  for (let i = 0; i < sortingValues.length; i++) datalist.appendChild(option(sortingValues[i]));
  datalist.addEventListener('change', (e) => {
    const event = e.target as HTMLOptionElement;
    handleLocalStorageSort('sort', event.value);
    handleQuerySearch();
    const data = filterData();
    renderFilterCards(sortProducts(data, event.value));
  });
  wrapper.append(datalist);
  return wrapper;
}

function option(value: string) {
  const option = createElement('option', '', value) as HTMLOptionElement;
  option.setAttribute('value', value);
  if (value === localStorage.getItem('sort')) option.selected = true;
  return option;
}

export function itemsCountPerPage() {
  const input = createElement('input', 'cart__items-count');
  input.setAttribute('type', 'text');
  return input;
}

export function promoCodeInput() {
  const input = createElement('input', 'promo-code__input');
  input.setAttribute('type', 'search');
  input.setAttribute('placeholder', 'Enter promo code');
  return input;
}
