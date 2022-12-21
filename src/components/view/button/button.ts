import createElement from '../../../utils/create-element';

export function resetStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn btn_light', 'RESET');
}

export function copyStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn btn_dark', 'COPY LINK');
}

export function addProductButton() {
  return createElement('button', 'number-control__btn btn btn_add-product', '+');
}

export function removeProductButton() {
  return createElement('button', 'number-control__btn btn btn_add-product', '-');
}

export function nextPageButton() {
  return createElement('button', 'btn btn_next', '>');
}

export function prevPageButton() {
  return createElement('button', 'btn btn_prev', '<');
}

export function buyNowButton() {
  return createElement('button', 'btn btn_dark', 'BUY NOW');
}
