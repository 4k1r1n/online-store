import createElement from '../utils/create-element';
import renderFormStore from '../components/view/form-store/form-store';

export default function getStore() {
  const store = createElement('div', 'store');
  store.appendChild(renderFormStore());
  const html = store.outerHTML;
  return html;
}
