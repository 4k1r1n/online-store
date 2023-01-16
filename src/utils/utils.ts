import { PATHS } from '../constants/constants';
import renderPage from '../pages/index';

export function redirectToPage(path: PATHS) {
  const url = new URL(window.location.href);
  const rootElement = document.getElementById('app') as HTMLElement;
  url.pathname = path;
  if (path === PATHS.main) url.search = '';
  window.history.pushState({}, '', url);
  rootElement.innerHTML = '';
  const page = renderPage(url.pathname);
  rootElement.append(page);
}

export function setLocalStorage(params: string, type: string) {
  localStorage.setItem(type, params);
}
