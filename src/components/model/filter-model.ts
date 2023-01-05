import { SORTING } from '../../constants/constants';
import data from '../../data/data';
import { Product } from '../../types/types';
import { filterLocalStorage } from '../controller/main-page';
import { createCategoriesInput } from '../view/form-store/input/categories-input';
import { createFilterInput } from '../view/form-store/input/filter-input';
import { sortProducts } from './sort-model';

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
    if (key === 'price' || key === 'stock') {
      arr.push([`${key}`, `${value}`]);
    } else {
      value.forEach((el) => arr.push([`${key}`, `${decodeURIComponent(el).split('%20').join(' ')}`]));
    }
  }

  return arr;
}

export function queryValues() {
  const query = getQueryParams();
  const filtersArr = getFilterQuery(query).map((el) => el[1]);
  return filtersArr;
}

export function filterData(query: string[][]): Product[] {
  let newData: Product[] = [];
  if (window.location.search.length !== 0) {
    // filter by brand and category

    for (let i = 0; i < query.length; i++) {
      const key = query[i][0];
      const value = query[i][1];
      data.forEach((el) => {
        if (el[key] === value) newData.push(el);
      });
    }

    // filter by price

    if (localStorage.getItem('price')) {
      const [leftPrice, rightPrice] = filterRange('price') as string[];
      if (newData.length) {
        newData = newData.filter((el) => el['price'] >= +leftPrice && el['price'] <= +rightPrice);
      } else {
        newData = data.filter((el) => el['price'] >= +leftPrice && el['price'] <= +rightPrice);
      }
    }

    //filter by stock

    if (localStorage.getItem('stock')) {
      const [leftRange, rightRange] = filterRange('stock') as string[];
      if (newData.length) {
        newData = newData.filter((el) => el['stock'] >= +leftRange && el['stock'] <= +rightRange);
      } else {
        newData = data.filter((el) => el['stock'] >= +leftRange && el['stock'] <= +rightRange);
      }
    }

    // //search

    // if (localStorage.getItem('search')) {
    //   const value = localStorage.getItem('search') as string;
    //   if (newData.length) {
    //     newData = searchProduct(newData, value);
    //   } else {
    //     newData = searchProduct(data, value);
    //   }
    // }

    //sort

    if (localStorage.getItem('sort')) {
      const value = localStorage.getItem('sort') as string;
      // console.log(value);
      if (newData.length) {
        console.log(value);
        newData = sortProducts(newData, value);
      } else {
        newData = sortProducts(data, value);
        // default sort
        if (newData.length) {
          newData = sortProducts(newData, SORTING.lowPrice);
        } else {
          newData = sortProducts(data, SORTING.lowPrice);
        }
      }
    }

    //search
    if (localStorage.getItem('search')) {
      const value = localStorage.getItem('search') as string;
      if (newData.length) {
        newData = searchProduct(newData, value);
      } else {
        newData = searchProduct(data, value);
      }
    }
  } else {
    newData = data;

    newData = sortProducts(newData, SORTING.lowPrice);
  }
  return newData;
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

export function toggleFilters() {
  toggleBrandFilters();
  toggleCategoryFilters();
  togglePriceFilters();
  toggleStockFilters();
}

export function toggleBrandFilters() {
  const section = document.querySelector('.filter') as HTMLElement;
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const fliterStorage = filterLocalStorage(obj);
  const data = filterData(fliterStorage);
  const filters = createFilterInput(data);
  section.lastChild?.remove();
  section.append(filters);
}

export function toggleCategoryFilters() {
  const section = document.querySelector('.categories') as HTMLElement;
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const data = filterData(filterLocalStorage(obj));
  const filters = createCategoriesInput(data);
  section.lastChild?.remove();
  section.append(filters);
}

export function togglePriceFilters() {
  const section = document.querySelector('.price') as HTMLElement;
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const data = filterData(filterLocalStorage(obj));
  const [leftPrice, rightPrice] = [findMinValue(data, 'price'), findMaxValue(data, 'price')];
  const leftInput = section.lastElementChild?.querySelector('.multi-range__left') as HTMLInputElement;
  const rightInput = section.lastElementChild?.querySelector('.multi-range__right') as HTMLInputElement;
  const leftLabel = section.querySelector('.multi-range__label-min') as HTMLElement;
  const rightLabel = section.querySelector('.multi-range__label-max') as HTMLElement;
  leftLabel.textContent = leftPrice.toString();
  rightLabel.textContent = rightPrice.toString();
  leftInput.value = leftPrice.toString();
  rightInput.value = rightPrice.toString();
}

export function toggleStockFilters() {
  const section = document.querySelector('.stock') as HTMLElement;
  const obj = JSON.parse(JSON.stringify({ ...localStorage }));
  const data = filterData(filterLocalStorage(obj));
  const [leftStock, rightStock] = [findMinValue(data, 'stock'), findMaxValue(data, 'stock')];
  const leftInput = section.lastElementChild?.querySelector('.multi-range__left') as HTMLInputElement;
  const rightInput = section.lastElementChild?.querySelector('.multi-range__right') as HTMLInputElement;
  const leftLabel = section.querySelector('.multi-range__label-min') as HTMLElement;
  const rightLabel = section.querySelector('.multi-range__label-max') as HTMLElement;
  leftLabel.textContent = leftStock.toString();
  rightLabel.textContent = rightStock.toString();
  leftInput.value = leftStock.toString();
  rightInput.value = rightStock.toString();
}

function findMaxValue(obj: Product[], key: string) {
  const values = obj.map((el) => el[key]) as number[];
  return Math.max(...values);
}

function findMinValue(obj: Product[], key: string) {
  const values = obj.map((el) => el[key]) as number[];
  return Math.min(...values);
}
