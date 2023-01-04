import { cartCounter, total } from './../view/header/header';
import { Product } from '../../types/types';
import { removeProduct } from '../model/cart';
import fidnDataById from '../model/find-data';
import data from '../../data/data';
import renderCartContent from '../view/cart-content/cart-content';
import { cartContainer } from '../../pages/cart';

export function handleAddItem(
  defaultStock: number,
  defaultPrice: number,
  counterText: HTMLElement,
  item: HTMLElement,
  itemPrice: HTMLElement
) {
  let cart: Product[] = [];
  let cartItemsNum: number;
  const itemId = Number(item.getAttribute('data-id'));
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  if (defaultStock) {
    cart.forEach((product) => {
      if (product.id === itemId && product.stock < defaultStock && product.stock !== 0) {
        product.stock--;
        product.price += defaultPrice;
        itemPrice.textContent = `$ ${product.price}`;
        if (cartCounter.textContent) {
          cartItemsNum = +cartCounter.textContent;
          cartItemsNum++;
          cartCounter.textContent = `${cartItemsNum}`;
          counterText.textContent = `${defaultStock - product.stock}`;
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  setCartItemsTotal();
}

export function handleRemoveItem(
  defaultStock: number,
  defaultPrice: number,
  counterText: HTMLElement,
  item: HTMLElement,
  itemPrice: HTMLElement
) {
  let cart: Product[] = [];
  let cartItemsNum: number;
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const itemId = Number(item.getAttribute('data-id'));
  const itemObj = fidnDataById(itemId) as Product;
  if (defaultStock) {
    cart.forEach((product) => {
      if (product.id === itemId && defaultStock - product.stock > 0) {
        product.stock++;
        product.price -= defaultPrice;
        itemPrice.textContent = `$ ${product.price}`;
        if (cartCounter.textContent) {
          cartItemsNum = +cartCounter.textContent;
          cartItemsNum--;
          cartCounter.textContent = `${cartItemsNum}`;
          counterText.textContent = `${defaultStock - product.stock}`;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      if (product.stock === defaultStock) {
        item.remove();
        removeProduct(itemObj);
        cart = JSON.parse(localStorage.cart);
        cartContainer.innerHTML = '';
        cartContainer.append(renderCartContent(cart));
      }
    });
    setCartItemsTotal();
  }
}

export function setItemCount(item: HTMLElement, stock: number) {
  const itemId = Number(item.getAttribute('data-id'));
  let cart: Product[] = [];
  let count;
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.cart);
    cart.forEach((product) => {
      if (product.id === itemId) {
        count = stock - product.stock;
      }
    });
  }
  return count;
}

export function setCartItemsCount() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const count = [];
  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j].id === cart[i].id) {
        count.push(data[j].stock - cart[i].stock);
      }
    }
  }
  const itemsCount = count.reduce((acc, value) => {
    return acc + value;
  }, 0);
  cartCounter.textContent = `${itemsCount}`;
}

export function setCartItemsTotal() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const itemsCount = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  total.textContent = `${itemsCount}`;
}
