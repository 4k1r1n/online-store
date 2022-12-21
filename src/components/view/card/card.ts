import createElement from '../../../utils/create-element';

export function createCard(img: string, name: string, price: string | number): HTMLElement {
  const card = createElement('div', 'card');
  const cardImage: HTMLElement = createElement('img', 'card__img');
  cardImage.setAttribute('img', img);
  const cardName = createElement('span', 'card__name', name);
  const cardPrice = createElement('span', 'card__price', '$ ' + price);
  const cardButton = createElement('button', 'card__btn');
  const cardInfo = createElement('div', 'card__info');
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardPrice);
  const cardFooter = createElement('div', 'card__footer');
  cardFooter.appendChild(cardInfo);
  cardFooter.appendChild(cardButton);
  card.appendChild(cardImage);
  card.appendChild(cardFooter);
  return card;
}
