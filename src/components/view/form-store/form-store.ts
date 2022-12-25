import createElement from '../../../utils/create-element';
import renderCategories from './caterogies/categories';
import renderFilter from './filters/filters';
import renderPriceRage from './price/price';
import renderStockRage from './stock/stock';
import { copyStoreButton, resetStoreButton } from '../button/button';

export default function renderFormStore() {
  const form = createElement('form', 'store-form');
  form.append(renderCategories());
  form.append(renderFilter());
  form.append(renderPriceRage());
  form.append(renderStockRage());
  form.append(resetStoreButton());
  form.append(copyStoreButton());
  return form;
}
