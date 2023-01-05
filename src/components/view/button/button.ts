import createElement from '../../../utils/create-element';
import clearAllFilters from '../../model/clear-filter';

export function resetStoreButton(): HTMLElement {
  const reset = createElement('button', 'btn form-store__btn btn_light', 'RESET');
  reset.addEventListener('click', (e) => {
    e.preventDefault();
    clearAllFilters();
    const url = window.location.origin;
    window.history.pushState({}, '', url);
    window.location.reload();
  });
  return reset;
}

export function copyStoreButton(): HTMLElement {
  const copy = createElement('button', 'btn form-store__btn btn_dark', 'COPY LINK');
  copy.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
  });
  return copy;
}

export function addProductButton() {
  return createElement('button', 'number-control__btn btn btn_add');
}

export function removeProductButton() {
  const btn = createElement('button', 'number-control__btn btn btn_remove');
  return btn;
}

export function nextPageButton() {
  return createElement('button', 'btn btn_next', '>');
}

export function prevPageButton() {
  return createElement('button', 'btn btn_prev', '<');
}

export function addToCartButton() {
  return createElement('button', 'btn btn_dark btn_cart', 'add to cart');
}

export function buyNowButton() {
  return createElement('button', 'btn btn_dark', 'BUY NOW');
}
