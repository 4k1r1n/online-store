import { Product } from '../../../types/types';
import createElement from '../../../utils/create-element';
import { handleChangeRoute } from '../../../utils/router';

export default function createBreadcrumps(data: Product) {
  const breadcrumps = createElement('div', 'breadcrumps wrapper');
  const homeLink = createElement('a', 'breadcrumps__link', 'STORE');
  homeLink.setAttribute('href', '/');
  homeLink.onclick = handleChangeRoute;
  const template = ` / ${data.category.toUpperCase()} / ${data.brand.toUpperCase()} / ${data.title.toUpperCase()}`;
  const path = createElement('span', 'breadcrumps__path', template);
  breadcrumps.append(homeLink, path);
  return breadcrumps;
}
