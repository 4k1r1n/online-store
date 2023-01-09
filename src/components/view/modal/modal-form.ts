import { PATHS } from '../../../constants/constants';
import { cartContainer } from '../../../pages/cart';
import createElement from '../../../utils/create-element';
import { redirectToPage } from '../../../utils/utils';
import { setCartItemsCount, setCartTotal } from '../../model/cart';
import { closeModal, incrementSeconds, validateForm } from '../../model/modal';
import { createConfirmButton } from '../button/button';
import { renderEmptyCart } from '../cart-content/cart-content';
import createModalCreditCard from './credit-card';
import createModalInputs from './modal-inputs';

export const confirmMessage = createElement('h2', 'modal-content__heading');

export default function renderModal() {
  const modalBackground = createElement('div', 'modal');
  const modalForm = createElement('form', 'modal-content');
  const modalHeading = createElement('h3', 'modal-content__heading', 'Personal Info');
  const modalInputs = createModalInputs();
  const modalCreditCard = createModalCreditCard();
  const modalConfirmBtn = createConfirmButton();

  modalBackground.appendChild(modalForm);
  modalForm.append(modalHeading, modalInputs, modalCreditCard, modalConfirmBtn);

  modalBackground.addEventListener('click', (e) => closeModal(e, modalBackground));
  modalForm.addEventListener('submit', (e) => {
    if (validateForm(e)) {
      localStorage.clear();
      setCartTotal();
      setCartItemsCount();

      cartContainer.textContent = '';
      cartContainer.append(renderEmptyCart());
      modalForm.textContent = '';
      modalForm.append(confirmMessage);
      document.body.classList.remove('lock');

      const sec = 4;
      incrementSeconds(sec);
      setTimeout(() => {
        redirectToPage(PATHS.main);
      }, 3000);
    }
  });
  return modalBackground;
}
