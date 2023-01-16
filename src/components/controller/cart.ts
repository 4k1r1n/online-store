import { cartCounter } from '../view/header/header';
import { Product, Promo } from '../../types/types';
import {
  addProduct,
  calculatePagesCount,
  changePage,
  getCurrentPromoObj,
  removeProduct,
  setCartItemsCount,
  setCartTotal,
  setCartTotalWithDiscount,
  setCurrentPage,
} from '../model/cart';
import fidnDataById from '../model/find-data';
import { displayCartItemsPerPage } from '../view/cart-content/cart-content';
import {
  appliedPromoCodeContainer,
  appliedPromoCodeList,
  appliedPromoCodeTitle,
  applyPromoCodeBtn,
  newSumTotalContainer,
  newTotal,
  promoCodeContainer,
  promoCodeFoundText,
  renderAppliedPromoListItem,
  summaryPromoCode,
  summaryPromoCodeBlock,
  sumTotalContainer,
} from '../view/cart-summary/cart-summary';
import { limit } from '../view/input/input';
import { checkCartIsEmpty } from '../../pages/cart';
import renderModal from '../view/modal/modal-form';
import { localStorageKeys, PATHS } from '../../constants/constants';
import { redirectToPage, setLocalStorage } from '../../utils/utils';

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
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
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
    setLocalStorage(JSON.stringify(cart), localStorageKeys.CART);
  }
  setCartTotal();
  setCartItemsCount();
  setCartTotalWithDiscount(appliedPromo);
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
  if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart);
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
        setLocalStorage(JSON.stringify(cart), localStorageKeys.CART);
      }
      if (product.stock === defaultStock) {
        item.remove();
        removeProduct(itemObj);
        cart = JSON.parse(localStorage.cart);
        displayCartItemsPerPage(cart, limit);
        const currentPage = setCurrentPage();
        const pagesCount = calculatePagesCount(limit);
        changePage(currentPage, pagesCount);
      }
    });
    setCartTotal();
    setCartItemsCount();
    setCartTotalWithDiscount(appliedPromo);
    checkCartIsEmpty(cart);
  }
}

export let appliedPromo: Promo[] = [];

export function handleRemovePromoCode(e: Event) {
  const targetBtn = e.target;
  if (targetBtn instanceof HTMLElement) {
    const listItem = targetBtn.closest('.list-item');
    const currPromo = listItem?.childNodes[0].textContent?.split(' ')[0];
    appliedPromo = appliedPromo.filter((promo) => promo.name.toUpperCase() !== currPromo);
    if (appliedPromoCodeList.childElementCount === 1) {
      appliedPromoCodeList.textContent = '';
      appliedPromoCodeContainer.remove();
      promoCodeContainer.remove();
      sumTotalContainer.classList.remove('summary__sum-total_strike');
      newSumTotalContainer.remove();
    } else if (listItem) {
      listItem.remove();
    }
    setCartTotalWithDiscount(appliedPromo);
  }
}

export function handleApplyPromoCode(e: Event) {
  const targetBtn = e.target;
  if (targetBtn instanceof HTMLElement) targetBtn.remove();
  const currPromo = promoCodeFoundText.textContent?.split(' ')[0];
  if (currPromo) {
    const currPromoObj = getCurrentPromoObj(currPromo) as Promo;
    appliedPromo.push(currPromoObj);
    sumTotalContainer.classList.add('summary__sum-total_strike');
    summaryPromoCode.prepend(appliedPromoCodeContainer);
    appliedPromoCodeContainer.append(appliedPromoCodeTitle, appliedPromoCodeList);
    if (promoCodeFoundText.textContent) {
      const listItem = renderAppliedPromoListItem(promoCodeFoundText.textContent);
      appliedPromoCodeList.append(listItem);
    }
    summaryPromoCode.prepend(newSumTotalContainer);
    newSumTotalContainer.append(newTotal);
  }
  setCartTotalWithDiscount(appliedPromo);
}

export function handleInputPromoCode(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    const inputTextValue = e.target.value.toUpperCase();
    const promoObj = getCurrentPromoObj(inputTextValue);
    if (promoObj && !appliedPromo.includes(promoObj)) {
      promoCodeContainer.append(promoCodeFoundText, applyPromoCodeBtn);
      promoCodeFoundText.textContent = `${promoObj.name.toUpperCase()} - ${promoObj.discount}%`;
      summaryPromoCodeBlock.append(promoCodeContainer);
    } else {
      promoCodeContainer.remove();
    }
  }
}

export function handleBuyNow() {
  const url = new URL(window.location.href);
  const rootElement = document.getElementById('app') as HTMLElement;
  const modal = renderModal();
  if (url.pathname !== PATHS.cart) {
    const idProduct = +window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    const objProduct = fidnDataById(idProduct) as Product;
    let cart: Product[] = [];
    addProduct(objProduct);
    if (localStorage.getItem(localStorageKeys.CART)) cart = JSON.parse(localStorage.cart) as Product[];
    cart.forEach((product) => {
      if (product.id === idProduct) product.stock--;
    });
    setLocalStorage(JSON.stringify(cart), localStorageKeys.CART);
    setCartItemsCount();
    setCartTotal();
    redirectToPage(PATHS.cart);
  }
  rootElement.append(modal);
  modal.classList.add('active');
  document.body.classList.add('lock');
}
