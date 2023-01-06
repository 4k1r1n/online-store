import createElement from '../../../utils/create-element';
import { handleApplyPromoCode } from '../../controller/cart';
import clearAllFilters from '../../model/clear-filter';

export function resetStoreButton(): HTMLElement {
  const reset = createElement('a', 'btn store-form__btn btn_link', 'RESET');
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
  const copy = createElement('a', 'btn store-form__btn btn_link', 'COPY LINK');
  copy.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
  });
  return copy;
}

export function addProductBtn() {
  return createElement('button', 'number-control__btn btn btn_add');
}

export function removeProductBtn() {
  return createElement('button', 'number-control__btn btn btn_remove');
}

export function nextPageButton() {
  return createElement('button', '', '>');
}

export function prevPageButton() {
  return createElement('button', '', '<');
}

export function addToCartButton() {
  return createElement('a', 'btn btn_link', 'Add to cart');
}

export function buyNowButton() {
  return createElement('a', 'btn btn_link', 'Buy now');
}

export function removeAppliedPromoCodeButton() {
  const removePromoCodeButton = createElement('a', 'btn btn_remove-promo btn_link', 'Remove');
  if (removePromoCodeButton instanceof HTMLButtonElement) {
    removePromoCodeButton.addEventListener('click', (e) => {
      console.log(e.target);
    });
  }
  return removePromoCodeButton;
}

export function createApplyPromoCodeButton() {
  const applyPromoCodeButton = createElement('a', 'btn btn_link', 'Apply');
  if (applyPromoCodeButton instanceof HTMLButtonElement) {
    applyPromoCodeButton.addEventListener('click', () => {
      handleApplyPromoCode();
    });
  }
  return applyPromoCodeButton;
}
