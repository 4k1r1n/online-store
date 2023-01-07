import createElement from '../../../utils/create-element';

export default function createModalInput() {
  const container = createElement('div', 'modal__inputs');
  const name = createElement('input', 'modal__input') as HTMLInputElement;
  name.placeholder = 'Name';
  name.setAttribute('type', 'text');
  name.required = true;
  const phone = createElement('input', 'modal__input') as HTMLInputElement;
  phone.placeholder = 'Phone number';
  phone.setAttribute('type', 'tel');
  phone.required = true;
  const delivery = createElement('input', 'modal__input') as HTMLInputElement;
  delivery.placeholder = 'Delivery';
  delivery.setAttribute('type', 'text');
  delivery.required = true;
  const email = createElement('input', 'modal__input') as HTMLInputElement;
  email.placeholder = 'E-mail';
  email.setAttribute('type', 'email');
  email.required = true;
  container.append(name, phone, delivery, email);
  return container;
}
