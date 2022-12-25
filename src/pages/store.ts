import createElement from '../utils/create-element';
import renderFormStore from '../components/view/form-store/form-store';
import renderCardsLayout from '../components/view/cards-store/cards-store';

export default function getStore() {
  const store = createElement('div', 'store');
  store.append(renderFormStore());
  store.append(renderCardsLayout());
  return store;
}
