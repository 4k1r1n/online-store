import createElement from '../../utils/create-element';
import {
  creditCardCvvInput,
  creditCardLogo,
  creditCardNumberInput,
  creditCardValidInput,
} from '../view/modal/credit-card';
import { confirmMessage } from '../view/modal/modal-form';
import { formInputEmail, formInputDelivery, formInputName, formInputPhone } from '../view/modal/modal-inputs';

export function closeModal(e: Event, bg: HTMLElement) {
  if (e.target === bg) {
    document.body.classList.remove('lock');
    bg.remove();
  }
}

export function validateForm(e: Event) {
  e.preventDefault();

  if (!validateName(formInputName)) {
    removeError(formInputName);
    addError(formInputName);
  }
  if (!validatePhone(formInputPhone)) {
    removeError(formInputPhone);
    addError(formInputPhone);
  }
  if (!validateDelivery(formInputDelivery)) {
    removeError(formInputDelivery);
    addError(formInputDelivery);
  }
  if (!validateEmail(formInputEmail)) {
    removeError(formInputEmail);
    addError(formInputEmail);
  }
  if (!validateNumberCreditCard(creditCardNumberInput)) {
    removeError(creditCardNumberInput);
    addError(creditCardNumberInput);
  }
  if (!validateCvvCreditCard(creditCardCvvInput)) {
    removeError(creditCardCvvInput);
    addError(creditCardCvvInput);
  }
  if (!validateValidCreditCard(creditCardValidInput)) {
    removeError(creditCardValidInput);
    addError(creditCardValidInput);
  }

  if (validateName(formInputName)) {
    removeError(formInputName);
  }
  if (validatePhone(formInputPhone)) {
    removeError(formInputPhone);
  }
  if (validateDelivery(formInputDelivery)) {
    removeError(formInputDelivery);
  }
  if (validateEmail(formInputEmail)) {
    removeError(formInputEmail);
  }
  if (validateNumberCreditCard(creditCardNumberInput)) {
    removeError(creditCardNumberInput);
  }
  if (validateCvvCreditCard(creditCardCvvInput)) {
    removeError(creditCardCvvInput);
  }
  if (validateValidCreditCard(creditCardValidInput)) {
    removeError(creditCardValidInput);
  }

  return (
    validateName(formInputName) &&
    validatePhone(formInputPhone) &&
    validateDelivery(formInputDelivery) &&
    validateEmail(formInputEmail) &&
    validateNumberCreditCard(creditCardNumberInput) &&
    validateCvvCreditCard(creditCardCvvInput) &&
    validateValidCreditCard(creditCardValidInput)
  );
}

const addError = (input: HTMLInputElement) => {
  const errorMessage = createElement('span', 'error-message');
  errorMessage.textContent = 'Invalid';
  input.after(errorMessage);
};

const removeError = (input: HTMLInputElement) => {
  if (input.nextElementSibling) input.nextElementSibling.remove();
};

const validateName = (input: HTMLInputElement) => {
  const name = input.value.split(' ');
  if (name.length < 2) return false;
  for (const word of name) {
    if (word.length < 3) return false;
  }
  return true;
};

const validatePhone = (input: HTMLInputElement) => {
  const phone = input.value;
  const reg = /^\+\d{9,}$/;
  return reg.test(phone);
};

const validateDelivery = (input: HTMLInputElement) => {
  const address = input.value.split(' ');
  if (address.length < 3) return false;
  for (const word of address) {
    if (word.length < 5) return false;
  }
  return true;
};

const validateEmail = (input: HTMLInputElement) => {
  const email = input.value;
  const reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  return reg.test(email);
};

const validateNumberCreditCard = (input: HTMLInputElement) => {
  const creditCardNumber = input.value;
  const reg = /^\d{16}$/;
  return reg.test(creditCardNumber);
};

const validateCvvCreditCard = (input: HTMLInputElement) => {
  const creditCardCvv = input.value;
  const reg = /^\d{3}$/;
  return reg.test(creditCardCvv);
};

const validateValidCreditCard = (input: HTMLInputElement) => {
  const creditCardValid = input.value;
  const reg = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  const expiredDate = input.value.split('/');
  const today = new Date();
  const date = new Date();
  date.setFullYear(+`20${expiredDate[1]}`, +expiredDate[0]);
  return reg.test(creditCardValid) && date > today;
};

export function changeCreditCardLogo(cardNumber: string) {
  const regVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const regMasterCard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
  const regJSB = /^(?:2131|1800|35\d{3})\d{12}$/;

  switch (true) {
    case regVisa.test(cardNumber):
      creditCardLogo.style.backgroundImage = "url('../assets/icons/modal/visa_ico.svg')";
      break;
    case regMasterCard.test(cardNumber):
      creditCardLogo.style.backgroundImage = "url('../assets/icons/modal/mastercard_ico.svg')";
      break;
    case regJSB.test(cardNumber):
      creditCardLogo.style.backgroundImage = "url('../assets/icons/modal/jcb_ico.svg')";
      break;
    default:
      creditCardLogo.style.backgroundImage = "url('../assets/icons/modal/credit-card_placeholder.svg')";
  }
}

export function incrementSeconds(sec: number) {
  sec--;
  confirmMessage.textContent = `Thanks for your order. Redirect to store after ${sec} sec`;
  setTimeout(() => incrementSeconds(sec), 1000);
  return sec;
}
