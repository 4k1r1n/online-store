import createElement from '../../../utils/create-element';

export default function createCheckbox() {
  const checkbox = createElement('input', 'checkbox');
  const label = createElement('label', 'form__label', 'value-change?');
  checkbox.setAttribute('type', 'checkbox');
  label.prepend(checkbox);
  return label;
}

export function createRange() {
  const range = createElement('input', 'range');
  range.setAttribute('type', 'range');
  return range;
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
