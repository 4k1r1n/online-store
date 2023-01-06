import createElement from '../../../utils/create-element';
import { handleChangeRoute } from '../../../utils/router';
import clearAllFilters from '../../model/clear-filter';
import { setCartItemsCount, setCartItemsTotal } from '../../controller/product-details';


export const cartCounter = createElement('span', 'cart-header__count');
export const total = createElement('span', 'total__sum', '0');

export default function renderHeader() {
  const header = createElement('header', 'header');
  const headerWrapper = createElement('div', 'header__wrapper wrapper');
  const logoWrapper = createElement('a', 'header__logo logo');
  const logo = createElement('h1', 'logo__title', 'Online-store');
  const cartWrapper = createElement('div', 'header__cart cart-header');
  const cartContainer = createElement('a', 'cart-header__info');
  const cartIco = createElement('span', 'ico ico_cart');
  const cartTotal = createElement('div', 'cart-header__total total');
  const totalText = createElement('span', 'total__text', 'Total: $');

  logoWrapper.setAttribute('href', '/');
  logoWrapper.addEventListener('click', (e) => {
    handleChangeRoute(e);
    clearAllFilters();
  });
  cartContainer.setAttribute('href', '/cart');
  cartContainer.addEventListener('click', (e) => {
    handleChangeRoute(e);
    clearAllFilters();
  });

  if (localStorage.getItem('cart')) {
    setCartItemsCount();
    setCartItemsTotal();
  } else {
    cartCounter.textContent = `${0}`;
  }

  header.append(headerWrapper);
  headerWrapper.append(logoWrapper, cartWrapper);
  logoWrapper.append(logo);

  cartWrapper.append(cartContainer, cartTotal);
  cartContainer.append(cartIco, cartCounter);
  cartTotal.append(totalText);
  totalText.append(total);

  return header;
}
