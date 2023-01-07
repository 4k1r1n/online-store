import createElement from '../../../utils/create-element';
import createModalCard from './card';
import createModalInput from './modal-inputs';

export default function renderModal() {
  const form = createElement('form', 'modal');
  const heading = createElement('h2', 'modal__heading', 'Personal Info');
  const inputs = createModalInput();
  const card = createModalCard();
  const button = createElement('button', 'btn modal__btn', 'CONFIRM');
  form.append(heading, inputs, card, button);
  return form;
}
