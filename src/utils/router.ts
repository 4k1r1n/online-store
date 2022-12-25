import renderPage from '../pages/index';

declare global {
  interface Window {
    handleChangeRoute: unknown;
  }
}

const handleChangeRoute = (event: Event) => {
  event = event || window.event;
  const link = (event.target as HTMLAnchorElement).href;
  event.preventDefault();
  window.history.pushState({}, '', link);
  handleLocation();
};

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
