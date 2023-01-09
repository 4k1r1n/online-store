import { changeCreditCardLogo } from '../model/modal';

export function handleNumberCreditCard(e: KeyboardEvent) {
  const reg = /^\d{0,16}$/;
  const event = e.target;
  if (event instanceof HTMLInputElement) {
    if (!reg.test(`${event.value}${e.key}`)) e.preventDefault();
    changeCreditCardLogo(event.value);
  }
}

export function handleCvvCreditCard(e: KeyboardEvent) {
  const reg = /^\d{0,3}$/;
  const event = e.target;
  if (event instanceof HTMLInputElement) {
    if (!reg.test(`${event.value}${e.key}`)) e.preventDefault();
  }
}

export function handleValidCreditCard(e: KeyboardEvent) {
  const event = e.target;
  const reg = /^\d{0,4}$/;
  if (event instanceof HTMLInputElement) {
    if (event.value.length === 2) event.value += '/';
    if (!reg.test(`${event.value.split('/').join('')}${e.key}`)) e.preventDefault();
  }
}
