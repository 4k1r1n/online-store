import createElement from '../../../utils/create-element';

export const formInputName = createElement('input', 'input input_modal') as HTMLInputElement;
export const formInputPhone = createElement('input', 'input input_modal') as HTMLInputElement;
export const formInputDelivery = createElement('input', 'input input_modal') as HTMLInputElement;
export const formInputEmail = createElement('input', 'input input_modal') as HTMLInputElement;

export default function createModalInputs() {
  const formInputsContainer = createElement('div', 'modal-content__inputs');
  const formInputContainerInputName = createElement('div', 'modal-content__input');
  const formInputContainerInputPhone = createElement('div', 'modal-content__input');
  const formInputContainerInputDelivery = createElement('div', 'modal-content__input');
  const formInputContainerInputEmail = createElement('div', 'modal-content__input');

  formInputName.placeholder = 'Name';
  formInputName.setAttribute('type', 'text');
  formInputName.value = '';

  formInputPhone.placeholder = 'Phone number';
  formInputPhone.setAttribute('type', 'text');
  formInputPhone.value = '';

  formInputDelivery.placeholder = 'Delivery';
  formInputDelivery.setAttribute('type', 'text');
  formInputDelivery.value = '';

  formInputEmail.placeholder = 'E-mail';
  formInputEmail.setAttribute('type', 'text');
  formInputEmail.value = '';

  formInputsContainer.append(
    formInputContainerInputName,
    formInputContainerInputPhone,
    formInputContainerInputDelivery,
    formInputContainerInputEmail
  );
  formInputContainerInputName.append(formInputName);
  formInputContainerInputPhone.append(formInputPhone);
  formInputContainerInputDelivery.append(formInputDelivery);
  formInputContainerInputEmail.append(formInputEmail);

  return formInputsContainer;
}
