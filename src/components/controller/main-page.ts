import getProduct from '../../pages/product-details';
import { localStorageKeys, PATHS, REMOVEPRODUCTTEXT } from '../../constants/constants';
import fidnDataById from '../model/find-data';
import { Product, StateCartButtons, StateCardButton } from '../../types/types';
import { addProduct, removeProduct, setCartItemsCount, setCartTotal } from '../model/cart';
import createBreadcrumps from '../view/breadcrumps/breadcrumps';
import { setLocalStorage } from '../../utils/utils';

export function handleQuerySearch() {
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  delete obj.cart;
  delete obj.page;
  delete obj.limit;
  const params = filterQuery(obj).join('&').split(',').join('%2C');
  const searchDevider = Object.keys(obj).length ? '?' : '';
  const url = window.location.origin + searchDevider + params;
  window.history.pushState({}, '', url);
}

export function handleProductClick(e: Event) {
  const event = e.target as HTMLElement;
  if (event.tagName === 'IMG') {
    const id = event.getAttribute('data-id') as string;
    const link = window.location.origin + PATHS.product + id;
    window.history.pushState({}, '', link);
    renderProductsSection(+id);
  }
}

export function renderProductsSection(id: number) {
  const rootElement = document.getElementById('app') as HTMLElement;
  const data = fidnDataById(id) as Product;
  const breadcrumps = createBreadcrumps(data);
  rootElement.innerHTML = '';
  const page = getProduct(+id);
  rootElement.append(breadcrumps, page);
}

function filterQuery(object: object) {
  const array: string[][] = [];
  for (const [key, value] of Object.entries(object)) {
    array.push([`${key}=${value}`]);
  }
  return array;
}

export function filterLocalStorage(object: object) {
  const array: string[][] = [];
  for (const [key, value] of Object.entries(object)) {
    const newValue = value.split(',');
    for (let i = 0; i < newValue.length; i++) {
      array.push([`${key},${newValue[i]}`]);
    }
  }
  return array.map((el) => el.join().split(','));
}

export function handelLocalStorage(event: Event, key: string, query: string[]) {
  const value = (event.target as HTMLInputElement).value;
  if (query.indexOf(value) === -1) {
    query.push(value);
  } else {
    query.splice(query.indexOf(value), 1);
  }
  setLocalStorage(query.join(','), key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}

export function handleLocalStorageRange(event: Event, key: string, query: string[]) {
  const values: { leftValue: string; rightValue: string } = {
    leftValue: '',
    rightValue: '',
  };
  let rightInput;
  let leftInput;
  const e = event.target as HTMLInputElement;
  switch (e.className) {
    case 'multi-range__left':
      values.leftValue = e.value;
      rightInput = e.nextElementSibling as HTMLInputElement;
      values.rightValue = rightInput.value;
      break;
    case 'multi-range__right':
      values.rightValue = e.value;
      leftInput = e.previousElementSibling as HTMLInputElement;
      values.leftValue = leftInput.value;
      break;
  }
  query.push(values.leftValue);
  query.push(values.rightValue);
  setLocalStorage(query.join(','), key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}

export function handleLocalStorageSearch(key: string, value: string) {
  setLocalStorage(value, key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}

export function handleCartClick(flag: boolean, id: number, event: Event) {
  if (event.target instanceof HTMLElement) {
    const e = event.target;
    let cart: Product[] = [];
    const objProduct = fidnDataById(id) as Product;
    if (!flag) {
      flag = true;
      addProduct(objProduct);
      if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === id) {
          product.stock--;
          e.classList.remove('btn_product-add');
          e.classList.add('btn_product-remove');
        }
      });
    } else {
      flag = false;
      removeProduct(objProduct);
      e.classList.add('btn_product-add');
      e.classList.remove('btn_product-remove');
      if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
      cart.forEach((product) => {
        if (product.id === id) {
          product.stock++;
        }
      });
    }
    setLocalStorage(JSON.stringify(cart), localStorageKeys.CART);
    setCartItemsCount();
    setCartTotal();
  }
  return flag;
}

export function setStateCardButtons(state: StateCardButton) {
  let cart: Product[] = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const objProduct = fidnDataById(state.id) as Product;
  cart.forEach((product) => {
    if (product.id === objProduct.id) {
      state.flag = true;
      state.btn.classList.remove('btn_product-add');
      state.btn.classList.add('btn_product-remove');
    }
  });
  return state.flag;
}

export function setStateProductBtn(state: StateCartButtons) {
  let cart: Product[] = [];
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
  const idProduct = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
  if (idProduct) {
    const objProduct = fidnDataById(+idProduct) as Product;
    cart.forEach((product) => {
      if (product.id === objProduct.id) {
        state.flag = true;
        state.btn.textContent = REMOVEPRODUCTTEXT;
      }
    });
    setCartTotal();
  }
  return state.flag;
}

export function handleLocalStorageSort(key: string, value: string) {
  setLocalStorage(value, key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}
