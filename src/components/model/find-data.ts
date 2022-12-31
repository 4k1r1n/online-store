import data from '../../data/data';
import { Product } from '../../types/types';

export default function fidnDataById(value: number) {
  return data.find((el) => el.id === value);
}

export function findAllPrices(data: Product[]) {
  return data.map((el) => el.price);
}
