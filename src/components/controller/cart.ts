import { cartCounter } from '../view/header/header';
import { Product, Promo } from '../../types/types';
import {
  calcNumPages,
  changePage,
  removeProduct,
  setCartItemsCount,
  setCartTotal,
  setCurrentPage,
} from '../model/cart';
import fidnDataById from '../model/find-data';
import { contentItems, displayCartItemsPerPage } from '../view/cart-content/cart-content';
import { PROMO } from '../../constants/constants';
import { renderPromoCodeRes, summaryPromoCodeBlock } from '../view/cart-summary/cart-summary';
import { limit } from '../view/input/input';

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
  setCartTotal();
  setCartItemsCount();
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
        displayCartItemsPerPage(cart, limit);
        const currentPage = setCurrentPage();
        const numPages = calcNumPages(limit);
        changePage(currentPage, numPages);
      }
    });
    setCartTotal();
    setCartItemsCount();
  }
}

export function handleRemovePromoCode(e: Event) {
  const targetBtn = e.target;
  // const promoCodes: Promo[] = JSON.parse(localStorage.promo);
  // if (targetBtn instanceof HTMLElement) {
  // const listItem = targetBtn.closest('.list-item');
  // const currPromo = listItem?.childNodes[0].textContent?.split(' ')[0];
  // appliedPromo = promoCodes.filter((promo) => promo.name.toUpperCase() !== currPromo);
  // if (appliedPromoCodeList.childElementCount === 1) {
  // removeAppliedPromoCodeList();
  // } else if (listItem) {
  // listItem.remove();
  // }
  // }
}

// export let appliedPromo: Promo[] = [];

export function handleApplyPromoCode(e: Event) {
  const targetBtn = e.target;
  // if (targetBtn instanceof HTMLElement) targetBtn.remove();
  // const currPromo = promoCodeFoundText.textContent?.split(' ')[0];
  // const currPromoObj = PROMO.find((promo) => promo.name.toUpperCase() === currPromo) as Promo;
  // appliedPromo.push(currPromoObj);
  // const appliedPromoCodeList = renderAppliedPromoCodeList();
  // appliedPromoCodeList.append(renderAppliedPromoListItem());
  // newSumTotalContainer.append(newTotal);
  // setCartTotalWithDiscount();
}

export function handleInputPromoCode(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    // let appliedPromoCodes: Promo[] = [];
    const inputTextValue = e.target.value.toUpperCase();
    const promoObj = PROMO.find((promo) => promo.name.toUpperCase() === inputTextValue);
    const promoCodeRes = renderPromoCodeRes();
    if (promoObj) {
      // promoCodeRes.textContent = `${promoObj.name.toUpperCase()} - ${promoObj.discount}%`;
      summaryPromoCodeBlock.append(promoCodeRes);
    } else {
    }
  }
}
