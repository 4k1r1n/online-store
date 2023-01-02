import { Product } from './../../../types/types';
import createElement from '../../../utils/create-element';
import fidnDataById from '../../model/find-data';
import { addProductToCart } from '../../model/cart';
import { cartCounter } from '../header/header';

export function createCard(img: string, name: string, price: string | number, id: number): HTMLElement {
  const card = createElement('div', 'card');
  const cardImage: HTMLElement = createElement('img', 'card__img');
  if (cardImage instanceof HTMLImageElement) {
    cardImage.src = img;
    cardImage.setAttribute('data-id', id.toString());
  }
  const cardName = createElement('span', 'card__name', name);
  const cardPrice = createElement('span', 'card__price', '$ ' + price);
  const cardButton = createElement('button', 'btn btn_card');
  const cardInfo = createElement('div', 'card__info');
  const cardFooter = createElement('div', 'card__footer');

  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardPrice);
  cardFooter.appendChild(cardInfo);
  cardFooter.appendChild(cardButton);
  card.appendChild(cardImage);
  card.appendChild(cardFooter);

  cardButton.addEventListener('click', () => {
    const idProduct = cardImage.getAttribute('data-id');
    if (idProduct) {
      const objProduct = fidnDataById(+idProduct) as Product;
      addProductToCart(objProduct);
      if (localStorage.getItem('cart')) cartCounter.textContent = JSON.parse(localStorage.cart).length;
    }
  });

  return card;
}
