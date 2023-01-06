import { Product } from '../../types/types';
import { addProduct, removeProduct, setCartItemsCount, setCartTotal } from '../model/cart';
import fidnDataById from '../model/find-data';

export function handleAddProductClick(flag: boolean, event: Event) {
  if (event.target instanceof HTMLElement) {
    const e = event.target;
    const idProduct = +window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    const objProduct = fidnDataById(idProduct) as Product;
    let cart: Product[] = [];
    if (!flag) {
      flag = true;
      addProduct(objProduct);
      e.textContent = 'remove from cart';
      if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === idProduct) product.stock--;
      });
    } else {
      flag = false;
      removeProduct(objProduct);
      e.textContent = 'add to cart';
      if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === idProduct) product.stock++;
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItemsCount();
    setCartTotal();
  }
  return flag;
}
