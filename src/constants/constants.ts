import { Promo } from '../types/types';

export enum PATHS {
  main = '/',
  cart = '/cart',
  product = '/product/',
}

export const PROMO: Promo[] = [
  {
    name: 'rs',
    discount: 10,
  },
  {
    name: 'test',
    discount: 10,
  },
];

export const SORTING = {
  lowPrice: 'price: low to high',
  highPrice: 'price: high to low',
  lowCapacity: 'capacity: low to high',
  highCapacity: 'capacity: high to low',
};

export const validation = {
  PHONE: /^\+\d{9,}$/,
  EMAIL: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  CREDIT_CARD_NUMBER_INPUT: /^\d{0,16}$/,
  CREDIT_CARD_CVV: /^\d{3}$/,
  CREDIT_CARD_CVV_INPUT: /^\d{0,3}$/,
  CREDIT_CARD_VALID: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  CREDIT_CARD_VALID_INPUT: /^\d{0,4}$/,
  CREDIT_CARD_VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
  CREDIT_CARD_MASTERCARD: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  CREDIT_CARD_JCB: /^(?:2131|1800|35\d{3})\d{12}$/,
};

export const REMOVE_PRODUCT_TEXT = 'remove from cart';

export enum localStorageKeys {
  CART = 'cart',
  PAGE = 'page',
  LIMIT = 'limit',
  SORT = 'sort',
  SEARCH = 'search',
  VIEW = 'view',
  PRICE = 'price',
  STOCK = 'stock',
  BRAND = 'brand',
  CATEGORY = 'category',
}
