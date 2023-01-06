import { Promo } from '../types/types';

export enum PATHS {
  main = '/',
  cart = '/cart',
  product = '/product/',
}

export const PROMO: Promo = {
  RS: 10,
  TEST: 10,
};

export const SORTING = {
  lowPrice: 'price: low to high',
  highPrice: 'price: high to low',
  lowCapacity: 'capacity: low to high',
  highCapacity: 'capacity: high to low',
};
