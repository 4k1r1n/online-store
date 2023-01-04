import createElement from '../../../utils/create-element';

export function resetStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn btn_light', 'RESET');
}

export function copyStoreButton(): HTMLElement {
  return createElement('button', 'btn form-store__btn btn_dark', 'COPY LINK');
}

export function addProductBtn() {
  return createElement('button', 'number-control__btn btn btn_add');
}

export function removeProductBtn() {
  return createElement('button', 'number-control__btn btn btn_remove');
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
