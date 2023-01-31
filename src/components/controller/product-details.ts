import { localStorageKeys, REMOVE_PRODUCT_TEXT } from '../../constants/constants';
import { Product } from '../../types/types';
import { setLocalStorage } from '../../utils/utils';
import { addProduct, removeProduct, setCartItemsCount, setCartTotal } from '../model/cart';
import fidnDataById from '../model/find-data';

export function handleAddProductClick(flag: boolean, event: Event) {
  if (event.target instanceof HTMLElement) {
    const e = event.target;
    const idProduct = +window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    const objProduct = fidnDataById(idProduct) as Product;
    let cart: Array<Product> = [];
    if (!flag) {
      flag = true;
      addProduct(objProduct);
      e.textContent = REMOVE_PRODUCT_TEXT;
      if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === idProduct) product.stock--;
      });
    } else {
      flag = false;
      removeProduct(objProduct);
      e.textContent = 'add to cart';
      if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === idProduct) product.stock++;
      });
    }
    setLocalStorage(JSON.stringify(cart), localStorageKeys.CART);
    setCartItemsCount();
    setCartTotal();
  }
  return flag;
}
