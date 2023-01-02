import { SORTING } from '../../constants/constants';
import { Product } from '../../types/types';

export function sortProducts(data: Product[], sort: string) {
  switch (sort) {
    case SORTING.lowPrice:
      return data.sort((a, b) => a.price - b.price);
    case SORTING.highPrice:
      return data.sort((a, b) => b.price - a.price);
    case SORTING.lowCapacity:
      return data.sort((a, b) => a.capacity - b.capacity);
    case SORTING.highCapacity:
      return data.sort((a, b) => b.capacity - a.price);
    default:
      return data.sort((a, b) => a.price - b.price);
  }
}
