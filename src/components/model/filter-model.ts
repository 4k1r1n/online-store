import { localStorageKeys, SORTING } from '../../constants/constants';
import data from '../../data/data';
import { Product } from '../../types/types';
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
  const filteredQuery: string[][] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === localStorageKeys.PRICE || key === localStorageKeys.STOCK) {
      filteredQuery.push([`${key}`, `${value}`]);
    } else {
      value.forEach((el) => filteredQuery.push([`${key}`, `${decodeURIComponent(el).split('%20').join(' ')}`]));
    }
  }

  return filteredQuery;
}

export function queryValues() {
  const query = getQueryParams();
  const filtersArr = getFilterQuery(query).map((el) => el[1]);
  return filtersArr;
}

export function filterData(): Array<Product> {
  let newData: Array<Product> = [];
  if (ifFiltersTrue()) {
    if (localStorage.getItem(localStorageKeys.CATEGORY)) {
      newData = filterCategory(data, localStorageKeys.CATEGORY);
      if (localStorage.getItem(localStorageKeys.BRAND)) {
        newData = filterCategory(newData, localStorageKeys.BRAND);
      }
    }

    if (localStorage.getItem(localStorageKeys.BRAND)) {
      newData = filterCategory(data, localStorageKeys.BRAND);
      if (localStorage.getItem(localStorageKeys.CATEGORY)) {
        newData = filterCategory(newData, localStorageKeys.CATEGORY);
      }
    }

    if (localStorage.getItem(localStorageKeys.PRICE)) {
      const [leftPrice, rightPrice] = filterRange(localStorageKeys.PRICE) as string[];
      if (newData.length) {
        newData = newData.filter(
          (el) => el[localStorageKeys.PRICE] >= +leftPrice && el[localStorageKeys.PRICE] <= +rightPrice
        );
      } else {
        newData = data.filter(
          (el) => el[localStorageKeys.PRICE] >= +leftPrice && el[localStorageKeys.PRICE] <= +rightPrice
        );
      }
    }

    if (localStorage.getItem(localStorageKeys.STOCK)) {
      const [leftRange, rightRange] = filterRange(localStorageKeys.STOCK) as string[];
      if (newData.length) {
        newData = newData.filter(
          (el) => el[localStorageKeys.STOCK] >= +leftRange && el[localStorageKeys.STOCK] <= +rightRange
        );
      } else {
        newData = data.filter(
          (el) => el[localStorageKeys.STOCK] >= +leftRange && el[localStorageKeys.STOCK] <= +rightRange
        );
      }
    }

    if (localStorage.getItem(localStorageKeys.SORT)) {
      const value = localStorage.getItem(localStorageKeys.SORT) as string;
      if (newData.length) {
        newData = sortProducts(newData, value);
      } else {
        newData = sortProducts(data, value);
      }
    }

    if (localStorage.getItem(localStorageKeys.SEARCH)) {
      const value = localStorage.getItem(localStorageKeys.SEARCH) as string;
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

export function filterByRange({
  Products,
  key,
  leftRange,
  rightRange,
}: {
  Products: Array<Product>;
  key: string;
  leftRange: number;
  rightRange: number;
}) {
  return Products.filter((el) => el[key] >= leftRange && el[key] <= rightRange);
}

export function searchProduct(Products: Array<Product>, value: string): Array<Product> {
  return Products.filter((el) => {
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
  const stock = document.querySelector('.stock .multi-range__label') as HTMLElement;
  const price = document.querySelector('.price .multi-range__label') as HTMLElement;
  if (filterData().length === 0) {
    price.style.visibility = 'hidden';
    stock.style.visibility = 'hidden';
  } else {
    price.style.visibility = 'visible';
    stock.style.visibility = 'visible';
  }
  toggleBrandFilters();
  toggleCategoryFilters();
  togglePriceFilters();
  toggleStockFilters();
}

export function toggleBrandFilters() {
  const section = document.querySelector('.filter') as HTMLElement;
  const data = filterData();
  const filters = createFilterInput(data);
  section.lastChild?.remove();
  section.append(filters);
}

export function toggleCategoryFilters() {
  const section = document.querySelector('.categories') as HTMLElement;
  const data = filterData();
  const filters = createCategoriesInput(data);
  section.lastChild?.remove();
  section.append(filters);
}

export function togglePriceFilters() {
  const section = document.querySelector('.price') as HTMLElement;
  const data = filterData();
  const [leftPrice, rightPrice] = [
    findMinValue(data, localStorageKeys.PRICE),
    findMaxValue(data, localStorageKeys.PRICE),
  ];
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
  const data = filterData();
  const [leftStock, rightStock] = [
    findMinValue(data, localStorageKeys.STOCK),
    findMaxValue(data, localStorageKeys.STOCK),
  ];
  const leftInput = section.lastElementChild?.querySelector('.multi-range__left') as HTMLInputElement;
  const rightInput = section.lastElementChild?.querySelector('.multi-range__right') as HTMLInputElement;
  const leftLabel = section.querySelector('.multi-range__label-min') as HTMLElement;
  const rightLabel = section.querySelector('.multi-range__label-max') as HTMLElement;
  leftLabel.textContent = leftStock.toString();
  rightLabel.textContent = rightStock.toString();
  leftInput.value = leftStock.toString();
  rightInput.value = rightStock.toString();
}

function findMaxValue(obj: Array<Product>, key: string) {
  const values = obj.map((el) => el[key]) as number[];
  return Math.max(...values);
}

function findMinValue(obj: Array<Product>, key: string) {
  const values = obj.map((el) => el[key]) as number[];
  return Math.min(...values);
}

function filterCategory(data: Array<Product>, type: string) {
  const categories = (localStorage.getItem(type) as string).split(',');
  const result: Array<Product> = [];
  for (let i = 0; i < categories.length; i++) {
    const value = categories[i];
    data.forEach((el) => {
      if (el[type] === value) result.push(el);
    });
  }
  return result;
}

function ifFiltersTrue() {
  const price = localStorage.getItem(localStorageKeys.PRICE);
  const stock = localStorage.getItem(localStorageKeys.STOCK);
  const category = localStorage.getItem(localStorageKeys.CATEGORY);
  const brand = localStorage.getItem(localStorageKeys.BRAND);
  const sort = localStorage.getItem(localStorageKeys.SORT);
  const search = localStorage.getItem(localStorageKeys.SEARCH);
  return [price, stock, category, brand, sort, search].filter((el) => !!el === true).length;
}
