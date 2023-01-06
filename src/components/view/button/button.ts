import createElement from '../../../utils/create-element';
import { handleApplyPromoCode } from '../../controller/cart';

export function resetStoreButton(): HTMLElement {
  return createElement('button', 'btn store-form__btn', 'Reset');
}

export function copyStoreButton(): HTMLElement {
  return createElement('button', 'btn store-form__btn', 'Copy link');
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
