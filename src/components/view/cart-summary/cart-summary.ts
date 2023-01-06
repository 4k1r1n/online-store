import createElement from '../../../utils/create-element';
import { buyNowButton, createApplyPromoCodeButton } from '../button/button';
import { createPromoCodeInput } from '../input/input';

export const productsCount = createElement('span', 'summary__products-count', '0');
export const sumTotal = createElement('div', 'summary__sum-total', `Total $ ${0}`);
export const promoCodeContainer = createElement('div', 'promo-code__res');
export const promoCodeFoundText = createElement('span', 'promo-code__res-text');
export const applyPromoCodeBtn = createApplyPromoCodeButton();

export const summaryPromoCode = createElement('div', 'summary__promo-code promo-code');
export const appliedPromoCodeContainer = createElement('div', 'promo-code__applied');
export const appliedPromoCodeTitle = createElement('h3', 'promo-code__applied-title', 'Applied promo codes');
export const appliedPromoCodeList = createElement('ul', 'promo-code__applied-list applied-list');
export const promoCodeInput = createPromoCodeInput();

export default function renderCartSummary() {
  const cartSummary = createElement('div', 'cart__summary summary');
  const summaryHeading = createElement('h2', 'summary__heading', 'Summary');
  const summaryInfo = createElement('div', 'summary__info');
  const productsText = createElement('span', 'summary__products-text', `Products: `);
  const promoCodeText = createElement('p', 'promo-code__text', 'Promo for test: RS, TEST');

  cartSummary.append(summaryHeading, summaryInfo, summaryPromoCode, buyNowButton());
  summaryInfo.append(productsText, sumTotal);
  productsText.append(productsCount);
  summaryPromoCode.append(promoCodeInput, promoCodeText);

  return cartSummary;
}
