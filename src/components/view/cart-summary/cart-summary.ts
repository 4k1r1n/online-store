import createElement from '../../../utils/create-element';
import { buyNowButton, createApplyPromoCodeButton, removeAppliedPromoCodeButton } from '../button/button';
import { createPromoCodeInput } from '../input/input';

export const productsCount = createElement('span', 'summary__products-count', '0');
export const sumTotalContainer = createElement('div', 'summary__sum-total', `Total $ `);
export const sumTotal = createElement('span', 'sum-total', `${0}`);
export const newTotal = createElement('span', 'new-sum-total', `${sumTotal.textContent}`);
export const newSumTotalContainer = createElement('div', 'summary__new-sum-total', `Total $ `);

export const applyPromoCodeBtn = createApplyPromoCodeButton();
export const promoCodeContainer = createElement('div', 'promo-code__res');
export const promoCodeFoundText = createElement('span', 'promo-code__res-text');

export const appliedPromoCodeContainer = createElement('div', 'promo-code__applied');
export const appliedPromoCodeList = createElement('ul', 'promo-code__applied-list applied-list');
export const appliedPromoCodeTitle = createElement('h3', 'promo-code__applied-title', 'Applied promo codes');
export const summaryPromoCode = createElement('div', 'summary__promo-code promo-code');
export const summaryPromoCodeBlock = renderSummaryPromoCode();

export default function renderCartSummary() {
  const cartSummary = createElement('div', 'cart__summary summary');
  const summaryHeading = createElement('h2', 'summary__heading', 'Summary');
  const summaryInfo = createElement('div', 'summary__info');
  const productsText = createElement('span', 'summary__products-text', `Products: `);
  cartSummary.append(summaryHeading, summaryInfo, summaryPromoCodeBlock, buyNowButton());
  summaryInfo.append(productsText, sumTotalContainer);
  sumTotalContainer.append(sumTotal);
  productsText.append(productsCount);
  return cartSummary;
}

export function renderSummaryPromoCode() {
  const promoCodeInput = createPromoCodeInput();
  const promoCodeText = createElement('p', 'promo-code__text', `Promo for test: RS, TEST`);
  summaryPromoCode.append(promoCodeInput, promoCodeText);
  return summaryPromoCode;
}

export function renderAppliedPromoListItem(promoText: string) {
  const appliedPromoCodeListItem = createElement('li', 'applied-list__item list-item');
  const listItemText = createElement('span', 'list-item__text');
  const removeAppliedPromoCodeBtn = removeAppliedPromoCodeButton();
  listItemText.textContent = promoText;
  appliedPromoCodeListItem.append(listItemText, removeAppliedPromoCodeBtn);
  return appliedPromoCodeListItem;
}
