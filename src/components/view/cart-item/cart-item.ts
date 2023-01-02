import createElement from '../../../utils/create-element';
import { addProductButton, removeProductButton } from '../button/button';
import { Product } from '../../../types/types';

export default function createCartItem(num: number, data: Product) {
  const item = createElement('div', 'cart__item item');
  const itemNum = createElement('span', 'item__num', num);
  const itemImg = createElement('img', 'item__img');
  const itemInfo = createElement('div', 'item__info');
  const itemName = createElement('h3', 'item__name', data.title);
  itemImg.setAttribute('src', data.images[0]);
  const itemCategory = createElement('p', 'item__category', data.category);
  const itemDesc = createElement('p', 'item__desc', data.description);
  const itemPrice = createElement('p', 'item__price', `$ ${data.price}`);
  const itemNumControl = createElement('div', 'item__number-control number-control');
  const itemCounter = createElement('span', 'number-control__counter', `${1}`);

  item.append(itemNum, itemImg, itemInfo, itemNumControl);
  itemInfo.append(itemName, itemCategory, itemDesc, itemPrice);
  itemNumControl.append(addProductButton(), itemCounter, removeProductButton());
  return item;
}
