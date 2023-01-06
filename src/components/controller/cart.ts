import { cartCounter } from '../view/header/header';
import { Product } from '../../types/types';
import { removeProduct, setCartItemsCount, setCartTotal } from '../model/cart';
import fidnDataById from '../model/find-data';
import getCart, { cartContainer } from '../../pages/cart';
import {
  appliedPromoCodeContainer,
  appliedPromoCodeList,
  appliedPromoCodeTitle,
  applyPromoCodeBtn,
  promoCodeFoundText,
  promoCodeInput,
  summaryPromoCode,
  sumTotalContainer,
} from '../view/cart-summary/cart-summary';
import createElement from '../../utils/create-element';
import { removeAppliedPromoCodeButton } from '../view/button/button';

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
        cartContainer.innerHTML = '';
        getCart();
      }
    });
    setCartTotal();
    setCartItemsCount();
  }
}

export function handleApplyPromoCode() {
  sumTotalContainer.classList.add('summary__sum-total_strike');
  summaryPromoCode.insertBefore(appliedPromoCodeContainer, promoCodeInput);
  appliedPromoCodeContainer.append(appliedPromoCodeTitle, appliedPromoCodeList);
  addAppliedPromoCodeItem();
  // const newSumTotalContainer = createElement('div', 'summary__new-sum-total', `Total $ `);
  // summaryPromoCode.insertBefore(appliedPromoCodeContainer);
  // newSumTotalContainer.append(newTotal);
  // setCartTotalWithDiscount();
  applyPromoCodeBtn.remove();
}

export function addAppliedPromoCodeItem() {
  const appliedPromoCodeListItem = createElement('li', 'applied-list__item list-item');
  const listItemText = createElement('span', 'list-item__text');
  const removeAppliedPromoCodeBtn = removeAppliedPromoCodeButton();
  listItemText.textContent = promoCodeFoundText.textContent;
  appliedPromoCodeList.appendChild(appliedPromoCodeListItem);
  appliedPromoCodeListItem.append(listItemText, removeAppliedPromoCodeBtn);
}
