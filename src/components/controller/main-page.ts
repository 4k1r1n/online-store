import getProduct from '../../pages/product-details';
import { PATHS } from '../../constants/constants';
import fidnDataById from '../model/find-data';
import { Product } from '../../types/types';
import { addProduct, removeProduct } from '../model/cart';
import { cartCounter } from '../view/header/header';

export function handleQuerySearch() {
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  delete obj.cart;
  // const obj = Object.entries(parsedObj).filter([key] =>  key!=='cart');
  const params = filterQuery(obj).join('&').split(',').join('%2C');
  const searchDevider = localStorage.length ? '?' : '';
  const url = window.location.origin + searchDevider + params;
  window.history.pushState({}, '', url);
}

export function setLocalStorage(params: string, type: string) {
  localStorage.setItem(type, params);
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
  rootElement.innerHTML = '';
  const page = getProduct(+id);
  rootElement.append(page);
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

export function handleCartClick(flag: boolean, img: HTMLElement, event: Event) {
  if (event.target instanceof HTMLElement) {
    const e = event.target;
    const idProduct = img.getAttribute('data-id');
    if (idProduct) {
      const objProduct = fidnDataById(+idProduct) as Product;
      if (!flag) {
        flag = true;
        e.classList.remove('btn_product-add');
        e.classList.add('btn_product-remove');
        addProduct(objProduct);
      } else {
        flag = false;
        e.classList.add('btn_product-add');
        e.classList.remove('btn_product-remove');
        removeProduct(objProduct);
      }
      if (localStorage.getItem('cart')) {
        cartCounter.textContent = JSON.parse(localStorage.cart).length;
      }
    }
  }

  return flag;
}

export function handleAddProductClick(flag: boolean, event: Event) {
  if (event.target instanceof HTMLElement) {
    const e = event.target;
    const idProduct = window.location.pathname.split('')[window.location.pathname.split('').length - 1];
    if (idProduct) {
      const objProduct = fidnDataById(+idProduct) as Product;
      if (!flag) {
        flag = true;
        addProduct(objProduct);
        e.textContent = 'remove from cart';
      } else {
        flag = false;
        removeProduct(objProduct);
        e.textContent = 'add to cart';
      }
      if (localStorage.getItem('cart')) {
        cartCounter.textContent = JSON.parse(localStorage.cart).length;
      }
    }
  }
  return flag;
}

export function setStateCardButtons(flag: boolean, btn: HTMLElement, img: HTMLElement) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const idProduct = img.getAttribute('data-id');
  if (idProduct) {
    const objProduct = fidnDataById(+idProduct) as Product;
    cart.forEach((product) => {
      if (product.id === objProduct.id) {
        flag = true;
        btn.classList.remove('btn_product-add');
        btn.classList.add('btn_product-remove');
      }
    });
  }
  return flag;
}

export function setStateProductBtn(flag: boolean, btn: HTMLElement) {
  let cart: Product[] = [];
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  const idProduct = window.location.pathname.split('')[window.location.pathname.split('').length - 1];
  if (idProduct) {
    const objProduct = fidnDataById(+idProduct) as Product;
    cart.forEach((product) => {
      if (product.id === objProduct.id) {
        flag = true;
        btn.textContent = 'remove from cart';
      }
    });
  }
  return flag;
}

export function handleLocalStorageSort(key: string, value: string) {
  setLocalStorage(value, key);
  if (!localStorage.getItem(key)) localStorage.removeItem(key);
}
