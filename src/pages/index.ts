import { PATHS } from '../constants/constants';
import getCart from './cart';
import getStore from './store';
import getError from './404';
import getProduct from './product-details';

export default function renderPage(path: string) {
  switch (path) {
    case PATHS.main:
      return getStore();
    case PATHS.cart:
      return getCart();
    case PATHS.product:
      return getProduct();
    default:
      return getError();
  }
}
