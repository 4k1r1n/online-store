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
