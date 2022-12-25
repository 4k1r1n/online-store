import createElement from '../utils/create-element';
import renderCartContent from '../components/view/cart-content/cart-content';
import renderCartSummary from '../components/view/cart-summary/cart-summary';

export default function getCart() {
  const cartContainer = createElement('div', 'cart cart__wrapper');
  cartContainer.append(renderCartContent(), renderCartSummary());
  return cartContainer;
}
