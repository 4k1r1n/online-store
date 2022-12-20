import createElement from '../../../utils/create-element';
import renderCategories from './caterogies/categories';
import renderFilter from './filters/filters';
import renderPriceRage from './price/price';
import renderStockRage from './stock/stock';
import { copyStoreButton, resetStoreButton } from '../button/button';

export default function renderFormStore() {
  const form = createElement('form', 'store-form');
  form.appendChild(renderCategories());
  form.appendChild(renderFilter());
  form.appendChild(renderPriceRage());
  form.appendChild(renderStockRage());
  form.appendChild(resetStoreButton());
  form.appendChild(copyStoreButton());
  return form;
}
