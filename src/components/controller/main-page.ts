import fidnDataById from '../model/find-data';
import { Product } from '../../types/types';
import getProduct from '../../pages/product-details';
import { PATHS } from '../../constants/constants';

export function handleQuerySearch(e: Event, type: string) {
  const event = e.target as HTMLElement;
  if (event.tagName === 'INPUT') {
    const url = new URL(window.location.href);
    const id = Number(event.getAttribute('data-id'));
    const query = fidnDataById(id) as Product;
    if (!(event as HTMLInputElement).checked) {
      const queryValue = query.category.split(' ').join('+');
      const params = url.search.slice(1).replace(`${type}=${queryValue}`, '');
      const newParams = new URLSearchParams(params);
      const newURL = new URL(url.origin + '?' + newParams);
      window.history.pushState({}, '', newURL);
    } else {
      url.searchParams.append(type, query.category);
      window.history.pushState({}, '', url);
    }
  }
}

export function handleProductClick(e: Event) {
  const event = e.target as HTMLElement;
  if (event.tagName === 'IMG') {
    const id = event.getAttribute('data-id') as string;
    const link = window.location.origin + PATHS.product + id;
    window.history.pushState({}, '', link);
    renderProductsSection(+id);
  }
}

export function renderProductsSection(id: number) {
  const rootElement = document.getElementById('app') as HTMLElement;
  rootElement.innerHTML = '';
  const page = getProduct(+id);
  rootElement.append(page);
}
