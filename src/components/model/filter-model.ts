import { SORTING } from '../../constants/constants';
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

export function filterData(): Product[] {
  let newData: Product[] = [];
  if (window.location.search.length !== 0) {
    if (localStorage.getItem('category')) {
      newData = filterCategory(data, 'category');
      if (localStorage.getItem('brand')) {
        newData = filterCategory(newData, 'brand');
      }
    }

    if (localStorage.getItem('brand')) {
      newData = filterCategory(data, 'brand');
      if (localStorage.getItem('category')) {
        newData = filterCategory(newData, 'category');
      }
    }

    if (localStorage.getItem('price')) {
      const [leftPrice, rightPrice] = filterRange('price') as string[];
      if (newData.length) {
        newData = newData.filter((el) => el['price'] >= +leftPrice && el['price'] <= +rightPrice);
      } else {
        newData = data.filter((el) => el['price'] >= +leftPrice && el['price'] <= +rightPrice);
      }
    }

    if (localStorage.getItem('stock')) {
      const [leftRange, rightRange] = filterRange('stock') as string[];
      if (newData.length) {
        newData = newData.filter((el) => el['stock'] >= +leftRange && el['stock'] <= +rightRange);
      } else {
        newData = data.filter((el) => el['stock'] >= +leftRange && el['stock'] <= +rightRange);
      }
    }

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
  const data = filterData();
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

function filterCategory(data: Product[], type: string) {
  const categories = (localStorage.getItem(type) as string).split(',');
  const result: Product[] = [];
  for (let i = 0; i < categories.length; i++) {
    const value = categories[i];
    data.forEach((el) => {
      if (el[type] === value) result.push(el);
    });
  }
  return result;
}
