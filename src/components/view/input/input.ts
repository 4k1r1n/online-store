import createElement from '../../../utils/create-element';
import { allStorage } from '../../model/filter-model';

export default function createCheckbox(value: string, id: number) {
  const checkbox = createElement('input', 'checkbox') as HTMLInputElement;
  const label = createElement('label', 'form__label', value);
  const queryValue = allStorage();
  if (queryValue.indexOf(value) != -1) checkbox.checked = true;
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', value);
  checkbox.setAttribute('data-id', `${id}`);
  label.prepend(checkbox);
  return label;
}

export function createRange() {
  const container = createElement('div', 'multi-range');
  const leftRange = createElement('input', 'multi-range__left');
  leftRange.setAttribute('type', 'range');
  leftRange.setAttribute('min', '0');
  leftRange.setAttribute('max', '100');
  leftRange.setAttribute('value', '0');
  const rightRange = createElement('input', 'multi-range__right');
  rightRange.setAttribute('min', '0');
  rightRange.setAttribute('max', '100');
  rightRange.setAttribute('type', 'range');
  rightRange.setAttribute('value', '100');
  container.append(leftRange, rightRange);
  return container;
}

export function createSearch() {
  const search = createElement('input', 'search');
  search.setAttribute('type', 'search');
  search.setAttribute('placeholder', 'Search');
  return search;
}

export function createSort() {
  const search = createElement('input', 'search');
  search.setAttribute('type', 'search');
  return search;
}

export function createOptions() {
  const wrapper = createElement('div', 'options');
  const datalist = createElement('datalist');
  datalist.setAttribute('id', 'options');
  // create options change to a function that takes options of sorting from data
  for (let i = 0; i < 4; i++) datalist.appendChild(option('option'));
  const input = createElement('input');
  input.setAttribute('list', 'options');
  input.setAttribute('placeholder', 'Sort options');
  wrapper.append(input);
  wrapper.append(datalist);
  return wrapper;
}

function option(value: string) {
  const option = createElement('option', '', value);
  option.setAttribute('value', value);
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
