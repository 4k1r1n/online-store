import { contentItems, createCartItems } from './../view/cart-content/cart-content';
import data from '../../data/data';
import { cartPageNum, cartPageText, nextPageBtn, prevPageBtn } from '../view/cart-content/footer';
import { newTotal, productsCount, sumTotal } from '../view/cart-summary/cart-summary';
import { cartCounter, total } from '../view/header/header';
import { limit } from '../view/input/input';
import { Product, Promo } from './../../types/types';
import { PROMO } from '../../constants/constants';

export function getCurrentPromoObj(currPromo: string) {
  return PROMO.find((promo) => promo.name.toUpperCase() === currPromo);
}

export function getLimit(e: Event, value: number) {
  const event = e.target;
  if (event instanceof HTMLInputElement) value = +event.value;
  return value;
}

export function setCurrentPage() {
  let currentPage: number;
  if (localStorage.getItem('page')) {
    currentPage = JSON.parse(localStorage.page);
  } else {
    currentPage = 1;
  }
  localStorage.setItem('page', JSON.stringify(currentPage));
  const url = new URL(window.location.href);
  url.searchParams.set('page', `${currentPage}`);
  window.history.pushState({}, '', url);
  cartPageNum.textContent = `${currentPage}`;
  return currentPage;
}

export function handlePrevPage() {
  const numPages = calcNumPages(limit);
  let currentPage = setCurrentPage();
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage, numPages);
  }
}

export function handleNextPage() {
  const numPages = calcNumPages(limit);
  let currentPage = setCurrentPage();
  if (currentPage < numPages) {
    currentPage++;
    changePage(currentPage, numPages);
  }
}

export function changePage(page: number, numPages: number) {
  if (page < 1) page = 1;
  if (page > numPages) page = numPages;
  localStorage.setItem('page', `${page}`);
  cartPageNum.textContent = `${page}`;
  if (page === 1) {
    prevPageBtn.classList.add('btn_hide');
  } else {
    prevPageBtn.classList.remove('btn_hide');
  }
  if (page === 0) {
    prevPageBtn.classList.add('btn_hide');
    nextPageBtn.classList.add('btn_hide');
    cartPageNum.textContent = '';
    cartPageText.textContent = '';
  }
  if (page === numPages) {
    nextPageBtn.classList.add('btn_hide');
  } else {
    nextPageBtn.classList.remove('btn_hide');
  }
  const url = new URL(window.location.href);
  url.searchParams.set('page', `${page}`);
  window.history.pushState({}, '', url);
  buildPage(page);
}

export function buildPage(page: number) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const items = createCartItems(cart);
  if (items.length) contentItems.textContent = '';
  const start = (page - 1) * limit;
  const end = page * limit;
  for (let i = start; i < end; i++) {
    if (items[i]) contentItems.append(items[i]);
  }
}

export function calcNumPages(itemsPerPage: number) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const numItems = cart.length;
  const numPages = Math.ceil(numItems / itemsPerPage);
  return numPages;
}

export function addProduct(obj: Product) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  cart.push(obj);
  const uniqueProducts = [...new Map(cart.map((item) => [item.id, item])).values()];
  localStorage.setItem('cart', JSON.stringify(uniqueProducts));
}

export function removeProduct(obj: Product) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart) as Product[];
  const cartWithoutProduct = cart.filter((product) => product.id !== obj.id);
  localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
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
  productsCount.textContent = `${itemsCount}`;
}

export function setCartTotal() {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const itemsCount = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  total.textContent = `${itemsCount}`;
  sumTotal.textContent = `${itemsCount}`;
}

export function setCartTotalWithDiscount(promoObj: Promo[]) {
  if (sumTotal.textContent) {
    const cartTotal = +sumTotal.textContent;
    const totalDiscount = calcTotalDiscount(promoObj);
    newTotal.textContent = `${cartTotal - (cartTotal * totalDiscount) / 100}`;
  }
}

export function calcTotalDiscount(promoObj: Promo[]) {
  return promoObj.reduce((acc, value) => {
    return acc + value.discount;
  }, 0);
}
