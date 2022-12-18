/* eslint-disable prettier/prettier */
import { PATHS } from '../constants/constants';
import getCart from './cart';
import getStore from './store';
import getError from './404';
import getProduct from './product-details';

export default function renderPage(path: string) {
  switch (path) {
    case PATHS.main:
      return getStore('whatever Man');
    case PATHS.cart:
      return getCart('look how much you bought');
    case PATHS.product:
      return getProduct('that is a cool lamp mAn');
    default:
      return getError('404');
  }
}
