import { PATHS } from '../constants/constants';
import getCart from './cart';
import getStore from './store';
import GetError from './404';

export default function renderPage(path: string) {
  switch (path) {
    case PATHS.main:
      return getStore();
    case PATHS.cart:
      return getCart();
    default:
      return new GetError().element;
  }
}
