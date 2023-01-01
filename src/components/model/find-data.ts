import data from '../../data/data';

export default function fidnDataById(value: number) {
  return data.find((el) => el.id === value);
}

export function findAllPrices() {
  return data.map((el) => el.price);
}

export function findAllStock() {
  return data.map((el) => el.stock);
}
