import { contentItems, createCartItems } from './../view/cart-content/cart-content';
import data from '../../data/data';
import { cartPageNum, nextPageBtn, prevPageBtn } from '../view/cart-content/footer';
import { newTotal, productsCount, sumTotal } from '../view/cart-summary/cart-summary';
import { cartCounter, total } from '../view/header/header';
import { limit } from '../view/input/input';
import { Product, Promo } from './../../types/types';
import { localStorageKeys, PROMO } from '../../constants/constants';
import { setLocalStorage } from '../../utils/utils';

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
  setLocalStorage(JSON.stringify(currentPage), 'page');
  const url = new URL(window.location.href);
  url.searchParams.set('page', `${currentPage}`);
  window.history.pushState({}, '', url);
  cartPageNum.textContent = `${currentPage}`;
  return currentPage;
}

export function handlePrevPage() {
  const pagesCount = calculatePagesCount(limit);
  let currentPage = setCurrentPage();
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage, pagesCount);
  }
}

export function handleNextPage() {
  const pagesCount = calculatePagesCount(limit);
  let currentPage = setCurrentPage();
  if (currentPage < pagesCount) {
    currentPage++;
    changePage(currentPage, pagesCount);
  }
}

export function updateCurrentPage(page: number, pagesCount: number) {
  if (page < 1) page = 1;
  if (page > pagesCount) page = pagesCount;
  setLocalStorage(`${page}`, 'page');
  cartPageNum.textContent = `${page}`;
  return page;
}

export function changePage(page: number, pagesCount: number) {
  page = updateCurrentPage(page, pagesCount);
  if (page === 1) {
    prevPageBtn.classList.add('btn_hide');
  } else {
    prevPageBtn.classList.remove('btn_hide');
  }
  if (page === pagesCount) {
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
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const items = createCartItems(cart);
  if (items.length) contentItems.textContent = '';
  const start = (page - 1) * limit;
  const end = page * limit;
  for (let i = start; i < end; i++) {
    if (items[i]) contentItems.append(items[i]);
  }
}

export function calculatePagesCount(itemsPerPage: number) {
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const numItems = cart.length;
  const pagesCount = Math.ceil(numItems / itemsPerPage);
  return pagesCount;
}

export function addProduct(obj: Product) {
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
  cart.push(obj);
  const uniqueProducts = [...new Map(cart.map((item) => [item.id, item])).values()];
  setLocalStorage(JSON.stringify(uniqueProducts), localStorageKeys.CART);
}

export function removeProduct(obj: Product) {
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
  const cartWithoutProduct = cart.filter((product) => product.id !== obj.id);
  setLocalStorage(JSON.stringify(cartWithoutProduct), localStorageKeys.CART);
}

export function setItemCount(item: HTMLElement, stock: number) {
  const itemId = Number(item.getAttribute('data-id'));
  let cart: Array<Product> = [];
  let count;
  if (localStorage.getItem(localStorageKeys.CART)) {
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
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
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
  let cart: Array<Product> = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const itemsCount = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  total.textContent = `${itemsCount}`;
  sumTotal.textContent = `${itemsCount}`;
}

export function setCartTotalWithDiscount(promoObj: Array<Promo>) {
  if (sumTotal.textContent) {
    const cartTotal = +sumTotal.textContent;
    const totalDiscount = calculateTotalDiscount(promoObj);
    newTotal.textContent = `${cartTotal - (cartTotal * totalDiscount) / 100}`;
  }
}

export function calculateTotalDiscount(promoObj: Array<Promo>) {
  return promoObj.reduce((acc, value) => {
    return acc + value.discount;
  }, 0);
}
