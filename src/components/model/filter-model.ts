import data from '../../data/data';
import { Product } from '../../types/types';

export function getQueryParams() {
  const query: { [key: string]: string[] } = {};
  window.location.search
    .slice(1)
    .split('&')
    .map((param) => {
      const [key, val] = param.split('=');
      query[key] = decodeURIComponent(val).split(',');
    });
  return query;
}

export function getFilterQuery(obj: { [key: string]: string[] }) {
  const arr: string[][] = [];
  for (const [key, value] of Object.entries(obj)) {
    value.forEach((el) => arr.push([`${key}`, `${decodeURIComponent(el).split('%20').join(' ')}`]));
  }

  return arr;
}

export function queryValues() {
  const query = getQueryParams();
  const filtersArr = getFilterQuery(query).map((el) => el[1]);
  return filtersArr;
}

export function filterData(query: string[][]): Product[] {
  const filteredData: Set<string> = new Set();
  for (let i = 0; i < query.length; i++) {
    const key = query[i][0];
    const value = query[i][1];
    data.forEach((el) => {
      if (el[key] === value) filteredData.add(JSON.stringify(el));
    });
  }
  const uniqueData = Array.from(filteredData);
  let result = uniqueData.map((el) => JSON.parse(el)) as Product[];
  if (!result.length) result = data;
  return result;
}

export function allStorage() {
  const values = [],
    keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values.toString().split(',');
}

export function filterRange(key: string) {
  const query = localStorage.getItem(key);
  return query?.split(',');
}

export function filterByRange(obj: Product[], key: string, leftRange: number, rightRange: number) {
  return obj.filter((el) => el[key] >= leftRange && el[key] <= rightRange);
}

export function searchProduct(obj: Product[], value: string): Product[] {
  return obj.filter((el) => {
    if (el.brand.toLowerCase().includes(value)) return el;
    if (el.capacity === +value) return el;
    if (el.category.toLowerCase().includes(value)) return el;
    if (el.description.toLowerCase().includes(value)) return el;
    if (el.price === +value) return el;
    if (el.stock === +value) return el;
    if (el.title.toLowerCase().includes(value)) return el;
  });
}
