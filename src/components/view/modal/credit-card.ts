import createElement from '../../../utils/create-element';
import {
  handleValidateValidCreditCard,
  handleValidateNumberCreditCard,
  handleValidateCvvCreditCard,
} from '../../controller/modal';

export const creditCardNumberInput = createElement('input', 'input input_credit-card') as HTMLInputElement;
export const creditCardCvvInput = createElement('input', 'input input_credit-card') as HTMLInputElement;
export const creditCardValidInput = createElement('input', 'input input_credit-card') as HTMLInputElement;
export const creditCardLogo = createElement('span', 'credit-card__logo');

export default function createModalCreditCard() {
  const creditCard = createElement('div', 'credit-card');
  const creditCardInfo = createElement('div', 'credit-card__name');
  const creditCardTitle = createElement('span');
  const creditCardContainerInputNumber = createElement('div', 'credit-card__number-input');
  creditCardTitle.textContent = 'Credit Card';
  creditCardNumberInput.placeholder = 'Card number';
  creditCardNumberInput.value = '';
  creditCardNumberInput.setAttribute('type', 'text');
  creditCardNumberInput.addEventListener('keypress', (e) => handleValidateNumberCreditCard(e));

  const creditCardCvvLabel = createElement('label', 'credit-card__field', 'CVV');
  creditCardCvvLabel.append(creditCardCvvInput);
  creditCardCvvInput.setAttribute('type', 'text');
  creditCardCvvInput.addEventListener('keypress', (e) => handleValidateCvvCreditCard(e));
  creditCardCvvInput.value = '';

  const creditCardValidLabel = createElement('label', 'credit-card__field', 'VALID');
  creditCardValidLabel.append(creditCardValidInput);
  creditCardValidInput.setAttribute('type', 'text');
  creditCardValidInput.addEventListener('keypress', (e) => handleValidateValidCreditCard(e));
  creditCardValidInput.value = '';

  const creditCardInputWrapper = createElement('div', 'layout-2-column');
  creditCardInputWrapper.append(creditCardValidLabel, creditCardCvvLabel);
  creditCard.append(creditCardInfo, creditCardContainerInputNumber, creditCardInputWrapper);
  creditCardContainerInputNumber.append(creditCardNumberInput);
  creditCardInfo.append(creditCardTitle, creditCardLogo);

  return creditCard;
}
