import renderPage from '../pages/index';

declare global {
  interface Window {
    handleChangeRoute: unknown;
  }
}

export function handleChangeRoute(event: Event) {
  event = event || window.event;
  const link = (event.target as HTMLAnchorElement).href;
  window.history.pushState({}, '', link);
  handleLocation();
  if (window.location.pathname === '/') {
    localStorage.removeItem('category');
    localStorage.removeItem('brand');
  }
}

const handleLocation = () => {
  const path: string | number = window.location.pathname;
  const rootElement = document.getElementById('app') as HTMLElement;
  rootElement.innerHTML = '';
  const page = renderPage(path);
  rootElement.append(page);
};

window.onpopstate = handleLocation;
window.handleChangeRoute = handleChangeRoute;
handleLocation();
