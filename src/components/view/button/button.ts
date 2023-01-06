import createElement from '../../../utils/create-element';
import { handleApplyPromoCode } from '../../controller/cart';
import clearAllFilters from '../../model/clear-filter';

export function resetStoreButton(): HTMLElement {
  const reset = createElement('button', 'btn store-form__btn', 'RESET');
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
  const copy = createElement('button', 'btn store-form__btn', 'COPY LINK');
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
  return createElement('button', 'btn', 'Add to cart');
}

export function buyNowButton() {
  return createElement('button', 'btn', 'Buy now');
}

export function removeAppliedPromoCodeButton() {
  const removePromoCodeButton = createElement('button', 'btn btn_remove-promo', 'Remove');
  if (removePromoCodeButton instanceof HTMLButtonElement) {
    removePromoCodeButton.addEventListener('click', (e) => {
      console.log(e.target);
    });
  }
  return removePromoCodeButton;
}

export function createApplyPromoCodeButton() {
  const applyPromoCodeButton = createElement('button', 'btn', 'Apply');
  if (applyPromoCodeButton instanceof HTMLButtonElement) {
    applyPromoCodeButton.addEventListener('click', () => {
      handleApplyPromoCode();
    });
  }
  return applyPromoCodeButton;
}
