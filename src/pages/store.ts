import createElement from '../utils/create-element';
import renderFormStore from '../components/view/form-store/form-store';
import renderCardsLayout from '../components/view/cards-store/cards-store';

export default function getStore() {
  const store = createElement('div', 'store');
  const storeWrapper = createElement('div', 'store__wrapper wrapper');
  store.append(storeWrapper);
  storeWrapper.append(renderFormStore());
  storeWrapper.append(renderCardsLayout());
  return store;
}
