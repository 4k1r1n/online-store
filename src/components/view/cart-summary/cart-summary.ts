import createElement from '../../../utils/create-element';
import { buyNowButton } from '../button/button';
import { promoCodeInput } from '../input/input';

export const productsCount = createElement('span', 'summary__products-count', '0');

export default function renderCartSummary() {
  const cartSummary = createElement('div', 'cart__summary summary');
  const summaryHeading = createElement('h4', 'summary__heading', 'Summary');
  const summaryInfo = createElement('div', 'summary__info');
  const productsText = createElement('span', 'summary__products-text', `Products:`);
  const sumTotal = createElement('div', 'summary__sum-total', `Total: $${1}`);
  const summaryPromoCode = createElement('div', 'summary__promo-code promo-code');
  const promoCodeText = createElement('p', 'promo-code__text', 'Promo for test:');
  cartSummary.append(summaryHeading, summaryInfo, summaryPromoCode, buyNowButton());
  summaryInfo.append(productsText, sumTotal);
  productsText.append(productsCount);
  summaryPromoCode.append(promoCodeInput(), promoCodeText);
  return cartSummary;
}
