import createElement from '../../../utils/create-element';
import createCartItem from '../cart-item/cart-item';
import renderCartHeader from './header';
import renderCartFooter from './footer';
import data from '../../../data/data';

export default function renderCartContent(count = 1) {
  const cartContent = createElement('div', 'cart__content');
  const cartItems = createElement('div', 'cart__items');
  cartContent.append(renderCartHeader(), cartItems);

  for (let i = 0; i < count; i++) {
    cartItems.appendChild(createCartItem(i, data[0]));
  }

  cartContent.append(renderCartFooter());
  return cartContent;
}
