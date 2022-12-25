import fidnDataById from '../model/find-data';
import { Product } from '../../types/types';

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
