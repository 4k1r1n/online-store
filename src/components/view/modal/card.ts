import createElement from '../../../utils/create-element';

export default function createModalCard() {
  const card = createElement('div', 'card');
  const cardInfo = createElement('div', 'card__name');
  cardInfo.innerHTML = '<span>Credit Card</span><span class="card__logo"></span>';
  const number = createElement('input', 'card__input card__number') as HTMLInputElement;
  number.placeholder = '1234 5678 9123 4567';
  const ccvLabel = createElement('label', 'card__ccv', 'CCV');
  const ccvInput = createElement('input', 'card__input');
  ccvLabel.append(ccvInput);
  const validLabel = createElement('label', 'card__valid', 'VALID');
  const validInput = createElement('input', 'card__input');
  validLabel.append(validInput);
  const inputWrapper = createElement('div', 'input-wrapper');
  inputWrapper.append(ccvLabel, validLabel);
  card.append(cardInfo, number, inputWrapper);
  return card;
}
