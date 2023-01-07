import createElement from '../../../utils/create-element';

export default function createModalCard() {
  const card = createElement('div', 'credit-card');
  const cardInfo = createElement('div', 'credit-card__name');
  cardInfo.innerHTML = '<span>Credit Card</span><span class="credit-card__logo"></span>';
  const number = createElement('input', 'credit-card__input credit-card__number') as HTMLInputElement;
  number.placeholder = '1234 5678 9123 4567';
  const ccvLabel = createElement('label', 'credit-card__ccv', 'CCV');
  const ccvInput = createElement('input', 'credit-card__input');
  ccvLabel.append(ccvInput);
  const validLabel = createElement('label', 'credit-card__valid', 'VALID');
  const validInput = createElement('input', 'credit-card__input');
  validLabel.append(validInput);
  const inputWrapper = createElement('div', 'input-wrapper');
  inputWrapper.append(ccvLabel, validLabel);
  card.append(cardInfo, number, inputWrapper);
  return card;
}
