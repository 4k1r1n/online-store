import createElement from '../utils/create-element';
import renderCartContent from '../components/view/cart-content/cart-content';
import renderCartSummary from '../components/view/cart-summary/cart-summary';

export default function getCart() {
  const cartContainer = createElement('div', 'cart wrapper');
  let cart;
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.cart);
  cartContainer.append(renderCartContent(cart));
  cartContainer.append(renderCartSummary());
  return cartContainer;
}
