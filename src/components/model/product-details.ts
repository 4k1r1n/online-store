import { localStorageKeys, REMOVE_PRODUCT_TEXT } from '../../constants/constants';
import { Product } from '../../types/types';
import { setCartTotal } from './cart';
import fidnDataById from './find-data';

export function setStateProductBtn(flag: boolean, btn: HTMLElement) {
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const idProduct = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
  if (idProduct) {
    const objProduct = fidnDataById(+idProduct) as Product;
    cart.forEach((product) => {
      if (product.id === objProduct.id) {
        flag = true;
        btn.textContent = REMOVE_PRODUCT_TEXT;
      }
    });
    setCartTotal();
  }
  return flag;
}
