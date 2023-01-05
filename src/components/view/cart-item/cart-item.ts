import createElement from '../../../utils/create-element';
import { addProductBtn, removeProductBtn } from '../button/button';
import { Product } from '../../../types/types';
import { handleAddItem, handleRemoveItem, setItemCount } from '../../controller/product-details';
import fidnDataById from '../../model/find-data';

export default function createCartItem(num: number, data: Product) {
  const item = createElement('div', 'cart__item item');
  const itemNum = createElement('span', 'item__num', `${num}`);
  const itemImg = createElement('img', 'item__img');
  const itemInfo = createElement('div', 'item__info');
  const itemName = createElement('h3', 'item__name', data.title);

  itemImg.setAttribute('src', data.images[0]);
  item.setAttribute('data-id', `${data.id}`);

  const itemId = Number(item.getAttribute('data-id'));
  const itemDefaultStock = fidnDataById(itemId)?.stock;
  const itemDefaultPrice = fidnDataById(itemId)?.price;

  const itemCategory = createElement('p', 'item__category', data.category);
  const itemDesc = createElement('p', 'item__desc', data.description);
  const itemPrice = createElement('p', 'item__price', `$ ${data.price}`);
  const itemStock = createElement('p', 'item__stock', `${itemDefaultStock}`);
  const itemNumControl = createElement('div', 'item__number-control number-control');
  const itemCounter = createElement('span', 'number-control__counter', `${1}}`);
  const addItem = addProductBtn();
  const removeItem = removeProductBtn();

  item.append(itemNum, itemImg, itemInfo, itemNumControl);
  itemInfo.append(itemName, itemCategory, itemDesc, itemPrice, itemStock);
  itemNumControl.append(removeItem, itemCounter, addItem);

  if (itemDefaultStock) itemCounter.textContent = `${setItemCount(item, itemDefaultStock)}`;

  addItem.addEventListener('click', () => {
    if (itemDefaultStock && itemDefaultPrice)
      handleAddItem(itemDefaultStock, itemDefaultPrice, itemCounter, item, itemPrice);
  });
  removeItem.addEventListener('click', () => {
    if (itemDefaultStock && itemDefaultPrice)
      handleRemoveItem(itemDefaultStock, itemDefaultPrice, itemCounter, item, itemPrice);
  });

  return item;
}
