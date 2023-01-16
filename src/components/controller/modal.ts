import { validation } from './../../constants/constants';
import { changeCreditCardLogo } from '../model/modal';

export function handleValidateNumberCreditCard(e: KeyboardEvent) {
  const event = e.target;
  if (event instanceof HTMLInputElement) {
    if (!validation.CREDIT_CARD_NUMBER_INPUT.test(`${event.value}${e.key}`)) e.preventDefault();
    changeCreditCardLogo(event.value);
  }
}

export function handleValidateCvvCreditCard(e: KeyboardEvent) {
  const event = e.target;
  if (event instanceof HTMLInputElement && !validation.CREDIT_CARD_CVV_INPUT.test(`${event.value}${e.key}`)) {
    e.preventDefault();
  }
}

export function handleValidateValidCreditCard(e: KeyboardEvent) {
  const event = e.target;
  if (event instanceof HTMLInputElement) {
    if (event.value.length === 2) event.value += '/';
    if (!validation.CREDIT_CARD_VALID_INPUT.test(`${event.value.split('/').join('')}${e.key}`)) e.preventDefault();
  }
}
