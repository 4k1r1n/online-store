import { PROMO } from './../../../constants/constants';
import {
  applyPromoCodeBtn,
  promoCodeContainer,
  promoCodeFoundText,
  summaryPromoCode,
} from './../cart-summary/cart-summary';
import createElement from '../../../utils/create-element';
import { filterLocalStorage, handleLocalStorageSearch, handleQuerySearch } from '../../controller/main-page';
import { filterData, queryValues, searchProduct } from '../../model/filter-model';
import { renderFilterCards } from '../cards-store/cards-store';

export default function createCheckbox(value: string, id: number) {
  const checkbox = createElement('input', 'checkbox') as HTMLInputElement;
  const label = createElement('label', 'form__label', value);
  const searcParams = queryValues();
  searcParams.forEach((el) => {
    if (el === value) checkbox.checked = true;
  });
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('value', value);
  checkbox.setAttribute('data-id', `${id}`);
  label.prepend(checkbox);
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
  const search = createElement('input', 'input');
  search.setAttribute('type', 'search');
  search.setAttribute('placeholder', 'Search');
  search.addEventListener('input', (e) => {
    const event = e.target as HTMLInputElement;
    let value = event.value;

    value = value.trim().toLowerCase();
    console.log(value);
    const obj = JSON.parse(JSON.stringify({ ...localStorage }));
    const fliterStorage = filterLocalStorage(obj);
    const data = filterData(fliterStorage);
    renderFilterCards(searchProduct(data, value));
    handleLocalStorageSearch('search', value);
    handleQuerySearch();
  });
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
  const input = createElement('input', 'input');
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

export function createPromoCodeInput() {
  const input = createElement('input', 'promo-code__input input');
  input.setAttribute('type', 'search');
  input.setAttribute('placeholder', 'Enter promo code');

  input.addEventListener('input', (e) => {
    if (e.target instanceof HTMLInputElement) {
      const inputTextValue = e.target.value.toUpperCase();
      const promo = Object.keys(PROMO)
        .filter((key) => key === inputTextValue)
        .join('');
      if (promo === inputTextValue && inputTextValue !== '') {
        summaryPromoCode.append(promoCodeContainer);
        promoCodeContainer.append(promoCodeFoundText, applyPromoCodeBtn);
        promoCodeFoundText.textContent = `${promo} - ${PROMO[promo]}%`;
      } else {
        promoCodeContainer.remove();
      }
    }
  });

  return input;
}
