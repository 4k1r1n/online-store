import { Product } from '../../types/types';
import { setCartTotal } from './cart';
import fidnDataById from './find-data';

export function setStateProductBtn(flag: boolean, btn: HTMLElement) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const idProduct = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
  if (idProduct) {
    const objProduct = fidnDataById(+idProduct) as Product;
    cart.forEach((product) => {
      if (product.id === objProduct.id) {
        flag = true;
        btn.textContent = 'remove from cart';
      }
    });
    setCartTotal();
  }
  return flag;
}
